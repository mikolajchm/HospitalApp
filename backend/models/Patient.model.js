const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  peselNum: { type: String, minlength: 11, maxlength: 11, required: true },
  priority: { type: String, required: true },
  age: { type: Number, required: true },
  attribution: { type: String, ref: 'Attribution'}
});

module.exports = mongoose.model('Patient', patientSchema);