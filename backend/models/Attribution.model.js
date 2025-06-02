const mongoose = require('mongoose');

const attributionSchema = new mongoose.Schema({
  idPatient: { type: String, required: true, ref: 'Patient' },
  idHospital: { type: String, required: true, ref: 'Hospital' },
  idBranch: { type: String, required: true, ref: 'Branch' },
  idDoctor: { type: String, required: true, ref: 'User' },
  date: { type: String, required: true },
  condition: { type: String, required: true },
  description: { type: String, required: true} 
});

module.exports = mongoose.model('Attribution', attributionSchema);