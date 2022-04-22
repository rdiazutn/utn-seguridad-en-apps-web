const queries = require('../database/example.queries')

const logInput = async(req, resp) => {
    console.log('request recieved: ', req)
    console.log('body request recieved: ', req.body)
    console.log('query request recieved: ', req.query)
    console.log('params request recieved: ', req.params)
    const queryExample = queries.example1()
    resp.status(200).json({
        msg: 'Test',
        bodyRequested: req.body,
        queryExample
    })
}

module.exports = {
    logInput
}