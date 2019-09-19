const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '',
    database: 'faceapp'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

//end ponts//
app.get('/', (req, res) => { res.send(db.users); });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res)});

app.listen(3001, () => {
  console.log('app is running');
});

/*     let found = false;
    database.users.forEach(user => {
      if (user.id === id) {
        found = true;
        user.entries++
        return res.json(user.entries);
      }
    });
    if (!found) {
      res.status(400).json('Not found');
    } */

/* // Load hash from your password DB.
bcrypt.compare('bacon', hash, function(err, res) {
  // res == true
});
bcrypt.compare('veggies', hash, function(err, res) {
  // res = false
}); */

/*
// --> res = this is working
//Sighn in --> POST success/ fail
//Register --> POST = user
//Profile/ user id --> GET = user
//Image --> PUT --> user
*/

/* const database = {
  users: [
    {
      id: '123',
      name: 'Mona',
      password: '1234asdf',
      email: 'mona@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Arvind',
      password: '4321asdf',
      email: 'arvind@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ]
}; */
