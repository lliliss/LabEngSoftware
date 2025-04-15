const {Pool} = require('pg')

const pool = new Pool({
    user: "lilice03",
    host: "localhost",
    database: "PharmaSafe",
    password: "lilice",
    port: 5432,
})

module.exports = pool