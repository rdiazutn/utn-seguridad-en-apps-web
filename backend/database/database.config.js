const { query } = require('express');
const mysql = require('mysql2');
require('dotenv').config()
const scripts = require('./initscript.database')
const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     :  process.env.DB_USER,
  password :  process.env.DB_PASSWORD,
  database :  process.env.DB_SCHEMA,
  port:  process.env.DB_PORT
});

scripts.forEach(query => connection.query(query,function (error, results, fields) {
  if (error){
    throw error;
    console.log(error)
  } 
  return console.log(results[0]);
}));


module.exports = connection