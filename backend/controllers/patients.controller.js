const Patient = require('../models/Patient.model');

exports.allPatients = async (req, res) => {
  try {
    return res.json(await Patient.find({}));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};