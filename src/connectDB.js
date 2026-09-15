const mySql = require('mysql2');
require('dotenv').config();

const conn = mySql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    ssl: {
        rejectUnauthorized: true
    }
});

conn.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('Database connected!');
});

module.exports = conn;