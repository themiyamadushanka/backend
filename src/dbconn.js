const express = require('express');
let mySql = require('mysql2');
const router = express.Router();
require('dotenv').config();
router.use(express.json());

const bearerToken = process.env.Btoken;

let conn = mySql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    connectTimeout: 10000,
    ssl: {
        rejectUnauthorized: true
    }
});

conn.connect(function(err){
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log("Connected!");
    
});

router.post('',(req,res)=>{
    if (!req.body || !req.headers) {
        return res.status(400).json({ message: 'Request body is missing' });
    }
    console.log(req.headers['authorization']);
    console.log(req.body);
    const { Cname, Thumbnail, isActive, Description } = req.body;
    if (req.headers['authorization'] == bearerToken) {
         const sql = `INSERT INTO courses (CName,Thumbnail,isActive,Description) VALUES (?, ?, ?, ?)`;
         conn.query(sql,[Cname,Thumbnail,isActive,Description],(err)=>{
             if (err) {
                 console.error('Course insert failed:', err.message);
                 return res.status(500).json({message:'Database error'});
             }
             console.log('success');
             res.status(200).json({message:'success'});
    })}else{
        res.status(401).json({message:'Unauthorized'});
    };
           
});





module.exports = router;

