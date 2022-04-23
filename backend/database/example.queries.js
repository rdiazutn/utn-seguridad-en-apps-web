const connection = require('./database.config')
const User = require('../domain/user')
const Todos = require('../domain/todo')

  const getUser = async(username, password) => connection.then((connection) => {
      return connection.execute(`SELECT * FROM user u WHERE u.username = '${username}' AND u.password = '${password}'`).then((results) => {
        if(results && results[0] && results[0][0]){
            const {id,username,password} = results[0][0]
            return new User({id,username,password}) 
        }
        return null
    })
  })

  const getUserAndTodosByToken = (token) => connection.then((realConnection) => {
        return realConnection.execute(`SELECT * FROM user u join todo t on t.user_id=u.id WHERE u.token='${token}';`).then((results) => {
            if(results[0] && results[0][0]){
                const {id,username,password} = results[0][0]
                const user = new User({id,username,password})
                const todos = results[0].map(data => {return {desc: data.desc, id:data.id}})
                return {user, todos};
            }
            return {user: null, todos:null}
        })
  }) 

  const saveToken = async(token, userId) => await connection.then(async(connection) => {
      return await connection.execute(`UPDATE user u SET u.token = '${token}' WHERE u.id=${userId}`);
  })
  

  const deleteTodo = async(todoId) => await connection.execute(`DELETE FROM todo t WHERE t.id=${todoId}`,);

// TODO: validar injection en createTodo description
const createTodo =async(desc, userId) => await connection.execute(`INSERT INTO todo (descripcion, user_id) t VALUES ('${desc}', ${userId})`);

const createTodoUnsafe = async(desc, userId) => await connection.execute(`INSERT INTO todo (descripcion, user_id) t VALUES ('${desc}', ${userId})`)

  module.exports = {
    getUser,
    getUserAndTodosByToken,
    saveToken,
    deleteTodo,
    createTodo,
    createTodoUnsafe
  }