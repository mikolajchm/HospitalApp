const adminMiddleware = (req, res, next) => {
  if (req.session.user.role === 'Admin') {
    next();
  } else {
    res.status(401).send({ message: 'You are not admin' });
  }
};

module.exports = adminMiddleware;