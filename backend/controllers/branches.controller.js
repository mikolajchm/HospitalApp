const Branches = require('../models/Branches.model');

exports.branches = async (req, res) => {
  try {
    return res.json(await Branches.find({}));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.byId = async (req, res) => {
  try {
    const branches = await Branches.findById( req.params.id );

    if (!branches) {
      return res.status(404).send({ message: 'Not Found !'});
    } else {
      return res.json(branches);
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.byHospitalId = async (req, res) => {
  try {
    const hospitalId = req.params.id;

    const branches = await Branches.find({
      idHospitals: hospitalId  
    });

    if (branches.length === 0) {
      return res.status(404).send({ message: 'No branches found for this hospital' });
    }

    return res.json(branches);

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}