const express = require('express')
const app = express()
const cors = require('cors')

// Middlewares
app.use(express.json())
app.use(cors())

// Default route
app.get('/', (req, res) => {
  res.send('Is working')
})


app.listen(8080, () => console.log('Listening on port 8080'))