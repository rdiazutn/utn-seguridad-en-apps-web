const connection = require('./database.config')

const example1 = () => connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    return console.log(results[0]);
  });

  module.exports = {
    example1
  }