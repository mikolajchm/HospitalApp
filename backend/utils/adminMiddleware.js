const Session = require('../models/Session.model');

const adminMiddleware = async (req, res, next) => {
  try {
    let user;

    if (process.env.NODE_ENV !== 'production') {

      const sessionId = req.sessionID;

      if (!sessionId) {
        return res.status(401).send({ message: 'You are not authorized (no session)' });
      }

      const sessionRecord = await Session.findOne({ _id: sessionId });
      if (!sessionRecord) {
        return res.status(401).send({ message: 'You are not authorized (session not found)' });
      }

      const sessionData = JSON.parse(sessionRecord.session);
      user = sessionData.user;

    } else {
      user = req.session?.user;
    }

    if (!user || user.role !== 'Admin') {
      return res.status(403).send({ message: 'You are not admin' });
    }

    next();

  } catch (err) {
    console.error(err);
    return res.status(401).send({ message: 'You are not authorized' });
  }
};

module.exports = adminMiddleware;