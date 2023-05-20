const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Edson2022',
    database: 'estoque'
})
module.exports = connection