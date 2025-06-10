const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Hospital', hospitalSchema);