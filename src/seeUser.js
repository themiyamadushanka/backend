const express = require('express');
const router = express.Router();
const conn = require('./connectDB');

router.get('', (req, res) => {
    const sql = 'select * from courses';
    conn.query(sql, (err, result) => {
        if (err) {
            console.error('Query failed:', err.message);
            return res.status(500).json({ message: 'Database error' });
        }
        console.log(result);
        res.status(200).json({ result });
    });
});

module.exports = router;
