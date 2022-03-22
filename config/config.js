require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": 0
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "task_scheduling_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": 0
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "ssl":true,
    "dialect": "postgres",
    "dialectOptions":{
      "ssl":{
        require:true,
        rejectUnauthorized: false
      },
    },
    "operatorsAliases": 1,
  }
}
