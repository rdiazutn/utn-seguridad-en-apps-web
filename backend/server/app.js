const express = require('express')
require('dotenv').config()
const cookieParser = require("cookie-parser");

class Server {
    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.app.use(cookieParser())
        this.routes()
        this.start()
    }

    routes() {
        this.app.use('/api', require('../routes/main.route'))
    }

    start() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App running on port ${process.env.PORT}`)
        })
    }
}

module.exports = Server