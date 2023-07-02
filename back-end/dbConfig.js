const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: '123456',
    database: process.env.DATABASE
})
module.exports = connection