const { query } = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config()
const scripts = require('./initscript.database')

const MAX_ATTEMPTS = 10;
const WAIT_TIME_MS = 3_000;

const config = {
  host     : process.env.DB_HOST ?? "localhost",
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_SCHEMA,
  port     : process.env.DB_PORT,
  multipleStatements: true,
}

const getClient = async () => {
  let attempts = 0;
  let connection = null;

  while (attempts < MAX_ATTEMPTS) {
    try {
      connection = await mysql.createConnection(config);
      break;
    } catch (error) {
      if (attempts < MAX_ATTEMPTS) {
        console.log(`DB connection failed, trying again in ${WAIT_TIME_MS}ms.`);
        await new Promise(resolve => setTimeout(resolve, WAIT_TIME_MS));
        attempts++;
        continue;
      } else {
        throw error;
      }
    }
  }

  return connection;
}

const createConnection = async() => {
  const connection = await getClient();
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