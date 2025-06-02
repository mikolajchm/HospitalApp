const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/HospitalApp');
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res) => {
  res.status(404).send('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});