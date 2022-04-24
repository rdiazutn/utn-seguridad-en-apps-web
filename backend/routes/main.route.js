const {Router} = require('express')
const router = Router()
const controller = require('../controllers/example.controller')
require('dotenv').config()



router.get('/todos',[
], controller.getTodos)

router.post('/todos',[
], controller.createTodo)

router.post('/admin/todos',[
], controller.createTodoUnsafe)


router.delete('/todos/:id',[
], controller.deleteTodo)

router.post('/login',[
], controller.login)


module.exports = router