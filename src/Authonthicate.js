const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let conn = require('./connectDB');
const router = express.Router();


const JWT_SECRET = process.env.JWT_SECRET;
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
router.use(cors());

router.post('/', (req, res) => {
    const { user, pass } = req.body;
    const sql = "SELECT * FROM user where username =?";
    conn.query(sql, [user], (err, result) => {
        if (!result || result.length === 0) {
            return res.status(404).json({ message: "please Signup" });
        }
        //return res.status(200).json({ message: result });
        if(result[0].username === user && result[0].password === pass){
            const token = jwt.sign({ id: user }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token });
        }else{
            return res.status(401).json({ message: "Invalid credentials" });
        }
        //return res.status(400).json({ message: "You are already logged in" });
        /*const sql2 = 'SELECT password from user where username=?';
        conn.query(sql2, [pass], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to fetch password' });
            }
            res.status(200).json({ result: result });
        })*/
    });
});

router.get('/', (req, res) => {
    res.status(405).json({ message: 'method not valid' });
});

module.exports = router;