const {Router} = require('express')
const router = Router()
const controller = require('../controllers/example.controller')
require('dotenv').config()


router.get(process.env.SANDBOX_URL,[
], controller.logInput)
router.post(process.env.SANDBOX_URL,[
], controller.logInput)
router.put(process.env.SANDBOX_URL,[
], controller.logInput)
router.patch(process.env.SANDBOX_URL,[
], controller.logInput)
router.delete(process.env.SANDBOX_URL,[
], controller.logInput)


module.exports = router