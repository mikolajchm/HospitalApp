const Attribution = require('../models/Attribution.model');
const Patient = require('../models/Patient.model');

exports.attributions = async (req, res) => {
  try {
    return res.json(await Attribution.find({}));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.post = async (req, res) => {
  try {
    const {
      idPatient,
      idHospital,
      idBranch,
      idDoctor,
      date,
      condition,
      description,
    } = req.body;

    const requiredFields = [
      'idPatient',
      'idHospital',
      'idBranch',
      'idDoctor',
      'date',
      'condition',
      'description'
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).send({ message: `Missing field: ${field}` });
      }
    }

    const newAttribution = await Attribution.create({
      idPatient,
      idHospital,
      idBranch,
      idDoctor,
      date,
      condition,
      description,
    });

    await Patient.findByIdAndUpdate(idPatient, {
      attribution: newAttribution._id,
    });

    res.status(201).send({
      message: 'Attribution created successfully',
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.getById = async (req, res) => {
  try {
    const attribution = await Attribution.findById( req.params.id );

    if (!attribution) {
      return res.status(404).send({ message: 'Attribution notfound !' });
    } else {
      return res.json(attribution);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.delete = async (req, res) => {
  try {
    const attribution = Attribution.findById(req.params.id);

    if (!attribution) {
      return res.status(404).send({ message: 'Attribution NOT FOUND !' });
    }

    await Attribution.deleteOne({ _id: req.params.id });
    return res.status(200).send({ message: 'Deleted!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.edit = async (req, res) => {
  try {
    const attribution = await Attribution.findById( req.params.id );

    if (!attribution) {
      return res.status(404).send({ message: 'Attribution not found !' });
    }

    Object.assign(attribution, req.body);

    await attribution.save();
    res.status(200).send({ message: 'Updated !' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}