const Hospital = require('../models/Hospital.model');

exports.hospitals = async (req, res) => {
  try {
    return res.json(await Hospital.find({}));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.getById = async (req, res) => {
  try {
    const hospital = await Hospital.findById( req.params.id );

    if (!hospital) {
      return res.status(404).send({ message: 'Not found !' });
    } else {
      return res.json(hospital);
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}