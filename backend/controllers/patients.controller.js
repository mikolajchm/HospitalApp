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

    const parsedAge = Number(req.body.age);
    if (isNaN(parsedAge) || parsedAge <= 0) {
      return res.status(400).send({ message: 'Age must be a valid positive number' });
    }

    const pesel = req.body.peselNum;
    const existingPatient = pesel !== 'Nie podano!'
      ? await Patient.findOne({ peselNum: pesel })
      : null;

    if (existingPatient) {
      return res.status(409).send({ message: 'Patient with this PESEL already exists' });
    }

    const newPatient = {
      ...req.body,
      age: parsedAge,
    };

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

    await Patient.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: 'Deleted !' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.edit = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).send({ message: 'Patient not found' });
    }

    if (req.body.hasOwnProperty('age')) {
      const parsedAge = Number(req.body.age);
      if (isNaN(parsedAge) || parsedAge <= 0) {
        return res.status(400).send({ message: 'Age must be a valid positive number' });
      }
      req.body.age = parsedAge;
    }

    if (req.body.peselNum && req.body.peselNum !== 'Nie podano!') {
      const existingPatient = await Patient.findOne({
        peselNum: req.body.peselNum,
        _id: { $ne: req.params.id }
      });

      if (existingPatient) {
        return res.status(409).send({ message: 'Another patient with this PESEL already exists' });
      }
    }

    Object.assign(patient, req.body);

    await patient.save();
    res.status(200).send({ message: 'Updated!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}