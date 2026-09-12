const express = require('express');
const app = express();
const cors = require('cors');

const seeUser = require('./seeUser')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors());


const addUser = require('./dbconn');
app.use('/adduser', addUser);    
app.use('/seeuser', seeUser);  


app.listen(8890, () => {
  console.log('Server running on port 8890');
});