const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const userroutes = require('./routes/user.routes');
const patientroutes = require('./routes/patient.routes');
const MongoStore = require('connect-mongo');

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/HospApp');
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ 
  secret: 'aaa123', 
  store: MongoStore.create(mongoose.connection), 
  resave: false, 
  saveUninitialized: false 
}));

app.use('/api', userroutes);
app.use('/api', patientroutes);

app.use('/', (req, res) => {
  res.status(404).send('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});