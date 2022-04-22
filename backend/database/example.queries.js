const connection = require('./database.config')
const User = require('../domain/user')
const Todos = require('../domain/todo')

const example1 = () => connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    return console.log(results[0]);
  });

  const getUserAndTodosByToken = (token) => connection.query(`SELECT * FROM user u join todo t on t.id_user=u.id WHERE u.token=${token};`,
  function (error, results, fields) {
    if (error) throw error;
    const {id,username,password, ...others} = results[0]
    const user = new User({id,username,password})
    const todos = results.map(data => {data.desc, data.todo_id})
    return {user, todos};
  });

  const saveToken = (token, userId) => connection.query(`UPDATE user u SET u.token = ${token} WHERE u.id=${userId}`,
  function (error, results, fields) {
    if (error) throw error;
    return 'OK';
  });

  const deleteTodo = (todoId) => connection.query(`DELETE FROM todo t WHERE t.id=${todoId}`,
  function (error, results, fields) {
    if (error) throw error;
    return 'OK';
  });

  const createTodo = (desc, userId) => connection.query(`INSERT INTO todo (descripcion, user_id) t VALUES (${desc}, ${userId})`,
  function (error, results, fields) {
    if (error) throw error;
    return 'OK';
  });

  module.exports = {
    example1,
    getUserAndTodosByToken,
    saveToken,
    deleteTodo,
    createTodo
  }