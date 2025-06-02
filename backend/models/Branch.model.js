const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numOfPlaces: { type: Number, required: true },
  numOfPlacesUrgent: { type: Number, required: true },
  idHospital: { type: String, required: true, ref: 'Hospital'}
});

module.exports = mongoose.model('Branch', branchSchema);