const {Router} = require('express')
const router = Router()
const controller = require('../controllers/example.controller')
require('dotenv').config()


router.get('/todos',[
], controller.getTodos)

router.get('/admin/todos',[
], controller.getAdminTodos)

router.get('/admin/users',[
], controller.getAllUsers)

router.post('/todos',[
], controller.createTodo)

router.post('/admin/todos',[
], controller.createTodoUnsafe)

router.delete('/admin/todos/:id',[
], controller.deleteTodoAdmin)


router.delete('/todos/:id',[
], controller.deleteTodo)

router.post('/login',[
], controller.login)


module.exports = router