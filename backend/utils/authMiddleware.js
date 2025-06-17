const Session = require('../models/Session.model');

const authMiddleware = async (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    try {
   
      const sessions = await Session.find({});

      if (!sessions.length) {
        return res.status(401).send({ message: 'You are not authorized' });
      }

      next();

    } catch (err) {
      return res.status(401).send({ message: 'You are not authorized' });
    }
  } else {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send({ message: 'You are not authorized' });
    }
  }
};

module.exports = authMiddleware;