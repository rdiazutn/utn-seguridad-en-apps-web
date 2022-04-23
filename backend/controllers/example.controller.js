const queries = require('../database/example.queries')
const md5 = require('js-md5')
/**
 *
 * usuarios --> id nombre pass (md5)
 */



const login = (req, resp) => {
    const {body} = req
    const user = queries.getUser(body.username, md5(body.password))
    if (!user) {
      return resp.status(401)
    }
    const token = generateToken()
    queries.saveToken(token, user.id)
    resp.status(200).cookie('token', token).cookie('isAdmin', 'true')
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

const createTodo  = (req, resp)  => {
    const {cookies, body} = req
    const user = queries.getUserByToken(cookies.token)
    if(!user){
        return resp.status(401)
    }
    const result = queries.createTodo(body.desc, user.id)
    resp.status(200).json({result})
}

const createTodoUnsafe  = (req, resp)  => {
    const {cookies, body} = req
    const user = queries.getUserByToken(cookies.token)
    if(!user){
        return resp.status(401)
    }
    if(cookies.isAdmin === "true"){
        result = queries.createTodoUnsafe(body.desc, user.id)
        resp.status(200).json({result})
    } else {
        return resp.status(401)
    }
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
    createTodo,
    getTodos,
    createTodoUnsafe
}