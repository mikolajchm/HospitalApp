const Session = require("../models/Session.model");

const authMiddleware = async (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    try {
      const sessionId = req.sessionID;

      if (!sessionId) {
        return res.status(401).send({ message: "You are not authorized (no session)" });
      }

      const sessionRecord = await Session.findOne({ _id: sessionId });
      if (!sessionRecord) {
        return res.status(401).send({ message: "You are not authorized (session not found)" });
      }

      next();
    } catch (err) {
      return res.status(401).send({ message: "You are not authorized" });
    }
  } else {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send({ message: "You are not authorized" });
    }
  }
};

module.exports = authMiddleware;
