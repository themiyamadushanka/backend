const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


const JWT_SECRET = 'hello';

let users = [];

app.post('/login',(req,res)=>{
    const {username,password}= req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user){
        return res.status(401).json({err:'invalid uname or pass'});
    };

    const payload = {
        id : user.id,
        username : user.username,
        password : user.password,
    };

    const token = jwt.sign(payload,JWT_SECRET,{expiresIn: '1h'});
    res.json({ message: 'Login successful', token });

});


app.post('/signin',(req,res)=>{
    const {username,password}=req.body;
    const user = {username:username,password:password}
    users.push(user)
    res.status(201).json({ message: 'User created' });
})

const Autonticate = (req,res,next) => {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = header.split(' ')[1];

    if (!token){
        return res.status(401).json({messege:'token missed'});
    }

    try{
        const decord = jwt.verify(token,JWT_SECRET);
        req.user = decord;

        next()
    }catch(error){
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

app.get('/profile', Autonticate, (req, res) => {
  res.json({ message: 'Profile accessed', user: req.user });
});


app.listen(8080, () => {
  console.log('Server running on port 8080');
});