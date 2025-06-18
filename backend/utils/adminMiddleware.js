const Session = require("../models/Session.model");

const adminMiddleware = async (req, res, next) => {
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
        return (
          data.user &&
          data.user.id === req.session.user.id &&
          data.user.role === "Admin"
        );
      } catch (e) {
        return false;
      }
    });

    if (!match) {
      return res.status(403).send({
        message: "Access denied. Admin privileges required.",
      });
    }

    next();
  } catch (err) {
    return res
      .status(401)
      .send({ message: "You are not authorized (middleware error)" });
  }
};

module.exports = adminMiddleware;