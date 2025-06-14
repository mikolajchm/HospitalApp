const Session = require('../models/Session.model');

const authMiddleware = async (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    try {
   
      const sessions = await Session.find({});

    
      if (!sessions.length) {
        return res.status(401).send({ message: 'You are not authorized' });
      }

     
      const sessionRecord = sessions[0];
      const sessionData = JSON.parse(sessionRecord.session);

      req.session.user = {
        id: sessionData.user.userId,
        login: sessionData.user.login,
        firstName: sessionData.user.firstName,
        lastName: sessionData.user.lastName,
        role: sessionData.user.role
      };

      await Session.deleteMany({
        _id: { $ne: sessionRecord._id }
      });

     
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