const Patient = require('../models/Patient.model');

exports.patients = async (req, res) => {
  try {
    return res.json(await Patient.find({}));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.getById = async (req, res) => {
  try {
    const patient = await Patient.findById( req.params.id );
    
    if (patient) {
      return res.json(patient);
    } else {
      res.status(404).send({ message: 'Patient not found!' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.post = async (req, res) => {
  try {
    const requiredFields = [
      'firstName', 'lastName', 'peselNum', 'priority', 'age'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({ message: `Missing field: ${field}` });
      }
    }

    if (typeof req.body.age !== 'number') {
      return res.status(400).send({ message: 'Age must be a number' });
    }

    const existingPatient = await Patient.findOne({ peselNum: req.body.peselNum });
    if (existingPatient) {
      return res.status(409).send({ message: 'Patient with this PESEL already exists' });
    }

    const newPatient = { ...req.body };

    const nwpatient = new Patient(newPatient);
    await nwpatient.save();

    res.status(201).send({ message: 'New patient created!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.delete = async (req, res) => {
  try {
    const patient = await Patient.findById( req.params.id );
    
    if (!patient) {
      return res.status(404).send({ message: 'Patient not found with this ID' });
    } 

    await Ad.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: 'Deleted !' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.edit = async (req, res) => {
  try {
    const patient = await Patient.findById( req.params.id );

    if (!patient) {
      return res.status(404).send({ message: 'Patient not found' });
    }

    Object.assign(patient, req.body);

    await patient.save();
    res.status(200).send({ message: 'Updated!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}