const queries = require('../database/example.queries')

/**
 *
 * usuarios --> id nombre pass (md5)
 */



const login = (req, resp) => {
    const {body} = req
    const token = generateToken();
    queries.saveToken(token, user.id)
    resp.status(200).cookie('token', token).cookie('isAdmin', "true");
}


const generateToken = () => {
    const result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result
}

const deleteTodo = (req, resp)  => {
    const {body} = req
    queries.deleteTodo(body.todoId)
    resp.status(200)
}

const createTodos  = (req, resp)  => {
    const {cookies, body} = req
    if(cookies.isAdmin === "true"){
        const user = queries.getUserByToken(cookies.token)
        if(user.id !== body.userId){
            return resp.status(401)
        }
    }
    queries.createTodo(body.desc, body.userId)
    resp.status(200)
}

const getTodos = (req, resp) => {
    const {cookies} = req
    const {user, todos} = queries.getUserAndTodosByToken(cookies.token)
    resp.status(200).json({
        ...user,
        todos
    })
}

module.exports = {
    login,
    deleteTodo,
    createTodos,
    getTodos
}