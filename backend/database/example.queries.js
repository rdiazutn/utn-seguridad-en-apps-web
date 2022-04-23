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

  const getUserAndTodosByToken = async(token) => connection.execute(`SELECT * FROM user u join todo t on t.id_user=u.id WHERE u.token='${token}';`).then((results) => {
      const {id,username,password, ...others} = results[0]
      const user = new User({id,username,password})
      const todos = results.map(data => {data.desc, data.todo_id})
      return {user, todos};
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