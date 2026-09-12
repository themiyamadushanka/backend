const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT
const seeUser = require('./seeUser')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors());


const addUser = require('./dbconn');
app.use('/adduser', addUser);    
app.use('/seeuser', seeUser);  


app.listen(PORT, () => {
  console.log('Server running on port 8890');
});
