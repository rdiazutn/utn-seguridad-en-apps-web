const connection = require('./database.config')
const User = require('../domain/user')
const Todos = require('../domain/todo')

const getUser = async(username, password) => connection.then((realConnection) => {
    return realConnection.execute(`SELECT * FROM user u WHERE u.username = '${username}' AND u.password = '${password}'`).then((results) => {
      if(results && results[0] && results[0][0]){
          const {id,username} = results[0][0]
          return new User({id,username}) 
      }
      return null
  })
})

const getUserByToken = async(token) => connection.then((realConnection) => {
  return realConnection.execute(`SELECT * FROM user u WHERE u.token = '${token}'`).then((results) => {
    if(results && results[0] && results[0][0]){
        const {id,username,isAdmin} = results[0][0]
        return new User({id,username,token,isAdmin}) 
    }
    return null
  })
})

const getUserAndTodosByToken = (token) => connection.then((realConnection) => {
      return realConnection.execute(`SELECT * FROM user u join todo t on t.user_id=u.id WHERE u.token='${token}';`).then((results) => {
          if(results[0] && results[0][0]){
              const {id,username} = results[0][0]
              const user = new User({id,username})
              const todos = results[0].map(data => {return {desc: data.desc, id:data.id}})
              return {user, todos};
          }
          return {user: null, todos:null}
      })
})

const getAllTodo = () => connection.then((realConnection) => {
  return realConnection.execute(`SELECT t.desc, t.id, u.username FROM todo t JOIN user u on u.id = t.user_id;`).then((results) => {
      if(results[0] && results[0][0]){
          const todos = results[0].map(data => {return {desc: data.desc, id:data.id, user: data.username}})
          return {todos};
      }
      return {todos:null}
  })
}) 

const saveToken = async(token, userId) => await connection.then(async(connection) => {
    return await connection.execute(`UPDATE user u SET u.token = '${token}' WHERE u.id=${userId}`);
})


const deleteTodo = async(todoId) => await connection.then((realConnection) => {
  return realConnection.execute(`DELETE FROM todo t WHERE t.id = ${realConnection.escape(todoId)}`)
})

// TODO: validar injection en createTodo description
const createTodo = async(desc, userId) => await connection.then((realConnection) => {
  console.log(`INSERT INTO todo (\`desc\`, user_id) VALUES ('${realConnection.escape(desc)}', ${userId})`)
  return realConnection.execute(`INSERT INTO todo (\`desc\`, user_id) VALUES (${realConnection.escape(desc)}, ${userId})`).then((result) => {
    return result[0]
  })
})

const createTodoUnsafe = async(desc, userId) => await connection.then((realConnection) => {
  console.log(`INSERT INTO todo (\`desc\`, user_id) VALUES ('${desc}', ${userId})`)
  return realConnection.query(`INSERT INTO todo (\`desc\`, user_id) VALUES ('${desc}', ${userId})`).then((result) => {
    return result[0]
  })
})

const getAllUsers = async() => connection.then((realConnection) => {
    return realConnection.execute(`SELECT * FROM user`).then((results) => {
      if(results && results[0]){
        return results[0].map(data => new User({id: data.id, username: data.username}))
      }

      return []
  })
})

  module.exports = {
    getUser,
    getUserAndTodosByToken,
    getAllTodo,
    saveToken,
    deleteTodo,
    createTodo,
    getUserByToken,
    createTodoUnsafe,
    getAllUsers
  }