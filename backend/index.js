const Server = require('./server/app')
//new Server();

const connection = require('./database/database.config')

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    return console.log(results[0]);
  });