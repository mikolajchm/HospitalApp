const Attribution = require('../models/Attribution.model');

exports.attributions = async (req, res) => {
  try {
    return res.json(await Attribution.find({}));
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