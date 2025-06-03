const Patient = require('../models/Patient.model');

exports.allPatients = async (req, res) => {
  try {
    return res.json(await Patient.find({}));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.getPatientbyId = async (req, res) => {
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

exports.postPatient = async (req, res) => {
  try {

    const requiredFields = [
      'firstName', 'lastName', 'peselNum', 'priority', 'age', 'attribution'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({ message: `Missing field: ${field}` });
      }
    }

    if (typeof req.body.age !== 'number') {
      return res.status(400).send({ message: 'Age must be a number' });
    }

    const newPatient = {...req.body};

    const nwpatient = new Patient(newPatient);
    await nwpatient.save()

    res.status(201).send({ message: 'New patient created!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.deletePatient = async (req, res) => {
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