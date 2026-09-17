const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const seeUser = require('./seeUser');
const Otp = require('./reqOTP');
const login = require('./Authonthicate');

const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
const EncrollCourse = require('./EncrollCoures');



const addUser = require('./dbconn');
app.use('/adduser', addUser);    
app.use('/seeuser', seeUser);  
app.use('/addEncrollmenet', EncrollCourse);
app.use('/login',login);
app.use('/otp',Otp);

const port = process.env.PORT || 8890;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
