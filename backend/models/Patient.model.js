const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  peselNum: { type: Number },
  priority: { type: String, required: true },
  age: { type: Number, required: true },
  attribution: { type: String, required: true, ref: 'Attribution'}
});

module.exports = mongoose.model('Patient', patientSchema);