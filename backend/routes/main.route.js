const {Router} = require('express')
const router = Router()
const controller = require('../controllers/example.controller')
require('dotenv').config()


router.get('/data',[
], controller.logInput)
router.post('/data',[
], controller.logInput)
router.put('/data',[
], controller.logInput)
router.patch('/data',[
], controller.logInput)
router.delete('/data',[
], controller.logInput)


module.exports = router