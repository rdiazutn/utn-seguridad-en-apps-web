const queries = require('../database/example.queries')
const md5 = require('js-md5')
/**
 *
 * usuarios --> id nombre pass (md5)
 */



const login = async(req, resp) => {
    const {body} = req
    try {
        const user = await queries.getUser(body.username, md5(body.password))
        if (!user) {
            resp.status(401).json({msg: 'Unauthorized'})
            return
        }
        const token = generateToken()
        await queries.saveToken(token, user.id)
    
        return resp.status(200).cookie('token', token).json({msg: 'sucessfully login!'})
        
    }catch (err){
        console.log('Login Error: ', err)
        return resp.status(500).json({err})
    }
}


const generateToken = () => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < 20; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result
}

const deleteTodo = async (req, resp)  => {
    try{
        const res = await queries.deleteTodo(req.params.id)
        resp.status(200).json({msg: 'sucessfully deleted!'})
    } catch(err) {
        return resp.status(500).json({err})
    }
}

const createTodo  = async (req, resp)  => {
    const {cookies, body} = req
    const user = await queries.getUserByToken(cookies.token)
    if(!user){
        return resp.status(401).json({msg: 'Unauthorized'})
    }
    const result = await queries.createTodo(body.desc, user.id)
    resp.status(200).json({id: result.insertId, desc: body.desc })
}

const createTodoUnsafe  = async (req, resp)  => {
    const {cookies, body} = req
    const user = await queries.getUserByToken(cookies.token)
    const selectedUser = body.selectedUser;

    if(!user){
        return resp.status(401).json({msg: 'Unauthorized'})
    }
    if(cookies.isAdmin === "true"){
        result = await queries.createTodoUnsafe(body.desc, selectedUser.id)
        resp.status(200).json({id: result.insertId, desc: body.desc, user: selectedUser.username, additionalData: result[1] })
    } else {
        return resp.status(403).json({msg: 'You aren\'t admin'})
    }
}

const getTodos = async(req, resp) => {
    const {cookies} = req
    try {
        const {user, todos} = await queries.getUserAndTodosByToken(cookies.token)
        if (!user) {
            return resp.status(401).json({msg: 'Unauthorized'})
        }
        resp.status(200).json({...user,todos})
    } catch(err) {
        return resp.status(500).json({err})
    }
}

const getAdminTodos = async(req, resp) => {
    const {cookies} = req
    const user = await queries.getUserByToken(cookies.token)
    const isAdmin = user.isAdmin;

    try {
        const {todos} = await queries.getAllTodo(cookies.token)
        resp.status(200).cookie('isAdmin', isAdmin).json({todos})
    } catch(err) {
        console.error(err)
        return resp.status(500).json({err})
    }
}

const deleteTodoAdmin = async (req, resp)  => {
    const {cookies, params} = req

    const id = params.id;

    const user = await queries.getUserByToken(cookies.token)

    if(!user){
        return resp.status(401).json({msg: 'Unauthorized'})
    }

    if(cookies.isAdmin === "true"){
        try{
            const res = await queries.deleteTodo(id)
            resp.status(200).json({msg: 'sucessfully deleted!'})
        } catch(err) {
            return resp.status(500).json({err})
        }
    } else {
        return resp.status(403).json({msg: 'You aren\'t admin'})
    }
}

const getAllUsers = async(req, resp) => {
    try {
        const users = await queries.getAllUsers();
        return resp.status(200).json({users})
    } catch (err){
        console.log('Login Error: ', err)
        return resp.status(500).json({err})
    }
}

module.exports = {
    login,
    deleteTodo,
    createTodo,
    getTodos,
    getAdminTodos,
    createTodoUnsafe,
    deleteTodoAdmin,
    getAllUsers
}