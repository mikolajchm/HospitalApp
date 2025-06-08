const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const authroutes = require('./routes/auth.routes');
const patientroutes = require('./routes/patient.routes');
const hospitalroutes = require('./routes/hospital.routes');
const attributionroutes = require('./routes/attribution.routes');
const branchroutes = require('./routes/branch.routes');

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

app.use('/api/auth', authroutes);
app.use('/api', patientroutes);
app.use('/api', attributionroutes);
app.use('/api', hospitalroutes);
app.use('/api', branchroutes);

app.use('/', (req, res) => {
  res.status(404).send('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});