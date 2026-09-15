const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const seeUser = require('./seeUser');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const EncrollCourse = require('./EncrollCoures');


app.use(cors());


app.get('/', (req, res) => {
  res.json({ message: 'Backend API' });
});

const addUser = require('./dbconn');
app.use('/adduser', addUser);    
app.use('/seeuser', seeUser);  
app.use('/addEncrollmenet', EncrollCourse);


const port = process.env.PORT || 8890;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
