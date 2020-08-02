const express= require('express');
const bcrypt= require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin= require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(express.json()); //to parse json body
app.use(cors()); //cross origin resource sharing

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '9672253211',
    database : 'smartbrain'  }
})

app.get('/', (req,res)=>{
	res.send(database.users);
})

app.post('/signin', (req,res)=>{signin.handleSignIn(req,res,db,bcrypt)});

app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)});

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)});

app.put('/image',(req,res)=>{image.handleEntries(req,res,db)});
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});

app.listen(3001, ()=>{
	console.log('app is running');
})

/*
GET= to get something,
POST= send data to server,
PUT= for updates in DB,
DELETE= for deletion
servers can loose variables like database when reloading
use bcrypt-nodejs to hash password 
use cors to bypass chrome security
use KNEXJS to connect to relational DB
Environment variable in NODE
*/