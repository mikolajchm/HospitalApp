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

    const userWithLogin = await User.findOne({ login });

    if (userWithLogin) {
      res.status(409).send({ message: 'User with this login already exists' });
    }

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
        return res.status(400).send({ message: 'Login or password are incorrect' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        req.session.user = {
          userId: user._id,
          login: user.login,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };

        return res.status(200).send({ message: 'Login successfull !' });
      } else {
        return res.status(400).send({ message: 'Login or password are incorrect' });
      }
    } else {
      return res.status(400).send({ message: 'Invalid input' });
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
    return res.status(200).send(req.session.user);
  } else {
    return res.status(400).send({ message: 'Login or password are incorrect' });
  }
}