const Branch = require('../models/Branch.model');

exports.branchs = async (req, res) => {
  try {
    return res.json(await Branch.find({}));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.byId = async (req, res) => {
  try {
    const branch = await Branch.findById( req.params.id );

    if (!branch) {
      return res.status(404).send({ message: 'Not Found !'});
    } else {
      return res.json(branch);
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.byHospitalId = async (req, res) => {
  try {
    const hospitalId = req.params.id;

    const branches = await Branch.find({
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