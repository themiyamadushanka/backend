const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
let mySql = require('mysql2');
require('dotenv').config();

app.use(cors());


let conn = mySql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    ssl: {
        rejectUnauthorized: true
    }
});

conn.connect(err=>{
    if (err) throw err;
    console.log('connect second db');
    
});

router.get('',(req,res)=>{
sql = 'select * from courses';
    conn.query(sql,(err,result,fields)=>{
        if (err) throw err;
        console.log(result);
        res.status(200).json({result});
    })
});

module.exports = router;

