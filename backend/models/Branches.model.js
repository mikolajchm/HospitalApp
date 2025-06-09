const mongoose = require('mongoose');

const branchesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numOfPlaces: { type: Number, required: true },
  numOfPlacesUrgent: { type: Number, required: true },
  idHospitals: [{ type: String, required: true, ref: 'Hospital' }]
});

module.exports = mongoose.model('Branches', branchesSchema);