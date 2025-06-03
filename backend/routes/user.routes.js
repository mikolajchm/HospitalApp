const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const user = require('../controllers/users.controller');

router.get('/user', user.user);
router.post('/register', user.register); //do dodania pracownika i admina - potem do usuniecia 
router.post('/login', user.login);
router.delete('/logout', authMiddleware, user.logout);
router.get('/sess', user.looged); // dane o zalogowanym uzytkowniku req.session.user

module.exports = router;
