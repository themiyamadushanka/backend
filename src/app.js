const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT
const seeUser = require('./seeUser')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors());


app.get('/', (req, res) => {
  res.json({ message: 'Backend API' });
});

const addUser = require('./dbconn');
app.use('/adduser', addUser);    
app.use('/seeuser', seeUser);  


const port = process.env.PORT || 8890;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
