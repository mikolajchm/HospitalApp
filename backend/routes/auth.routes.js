const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const adminMiddleware = require('../utils/adminMiddleware');

const auth = require('../controllers/auth.controller');

router.get('/users', adminMiddleware, auth.users);
router.post('/register', adminMiddleware, auth.register); //do dodania pracownika i admina - potem do usuniecia 
router.post('/login', auth.login);
router.delete('/userremove/:id', adminMiddleware, auth.delete);
router.delete('/logout', authMiddleware, auth.logout);
router.get('/logged', authMiddleware, auth.logged); // dane o zalogowanym uzytkowniku req.session.user

module.exports = router;
