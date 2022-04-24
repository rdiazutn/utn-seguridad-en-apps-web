const { query } = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config()
const scripts = require('./initscript.database')

const createConnection = async() => {
  const connection = await mysql.createConnection({
    host     : process.env.DB_HOST,
    user     :  process.env.DB_USER,
    password :  process.env.DB_PASSWORD,
    database :  process.env.DB_SCHEMA,
    port:  process.env.DB_PORT,
    multipleStatements: true
  });
  scripts.forEach(query => connection.execute(query).then( () => {
    console.log(`Query: ${query} was sucessfully execute `)
    return "OK";
  }).catch( () => {
      console.log(`Query: ${query} was not execute. Error: ${error}`)
      throw error;
  }));
  return connection
}

const connection = createConnection().then( (resolvedConnection) =>  {return resolvedConnection}).catch((err) => console.log(err))


module.exports = connection