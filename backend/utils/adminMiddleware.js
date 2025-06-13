const Session = require('../models/Session.model');

const adminMiddleware = async (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    try {
      const sessions = await Session.find({});

      if (!sessions.length) {
        return res.status(401).send({ message: 'You are not authorized' });
      }

      const sessionRecord = sessions[0];
      const sessionData = JSON.parse(sessionRecord.session);

      const user = sessionData.user;

      if (!user || user.role !== 'Admin') {
        return res.status(403).send({ message: 'You are not admin' });
      }

      req.session.user = {
        id: user.userId,
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };
     
      await Session.deleteMany({ _id: { $ne: sessionRecord._id } });

      next();
    } catch (err) {
      return res.status(401).send({ message: 'You are not authorized' });
    }
  } else {
    const user = req.session?.user;
    if (user && user.role === 'Admin') {
      next();
    } else {
      res.status(403).send({ message: 'You are not admin' });
    }
  }
};  

module.exports = adminMiddleware;