const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

exports.user = async (req, res) => {
  try {
    return res.json(await User.find({}));
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, login, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      login,
      password: hashedPassword,
      role,
    });

    res.status(201).send({ message: 'User created: ' + user.login });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};