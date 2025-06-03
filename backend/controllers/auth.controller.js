const User = require('../models/User.model');
const Session = require('../models/Session.model');
const bcrypt = require('bcryptjs');

exports.users = async (req, res) => {
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
}

exports.delete = async (req, res) => {
  try {
    const usertodelete = User.findById( req.params.id );

    if (!usertodelete) {
      return res.status(404).send({ message: 'User not found' });
    } 

    await User.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: 'Deleted !' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login });

      if (!user) {
        res.status(400).send({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compare(password, user.password)) {
          req.session.user = ({ userId: user._id, login: user.login, firstName: user.firstName, lastName: user.lastName, role: user.role });
          res.status(200).send({ message: 'Login successful' });
        } else {
          res.status(400).send({ message: 'Login or password are incorrect' });
        }
      }
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.logout = async (req, res) => {
  try {
    await req.session.destroy(() => {});
    await Session.deleteMany({});
    res.status(202).send({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.logged = async (req, res) => {
  if (req.session.user) {
    res.status(200).send({ user: req.session.user });
  } else {
    res.status(400).send({ message: 'Login or password are incorrect' });
  }
}