const Session = require("../models/Session.model");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.session.user || !req.session.user.id) {
      return res
        .status(401)
        .send({ message: "You are not authorized (missing user)" });
    }

    const allSessions = await Session.find({});

    const match = allSessions.find((sessionDoc) => {
      try {
        const data = JSON.parse(sessionDoc.session);
        return data.user && data.user.id === req.session.user.id;
      } catch (e) {
        return false;
      }
    });

    if (!match) {
      return res
        .status(401)
        .send({
          message: "You are not authorized (user not found in sessions)",
        });
    }

    next();
  } catch (err) {
    return res
      .status(401)
      .send({ message: "You are not authorized (middleware error)" });
  }
};

module.exports = authMiddleware;
