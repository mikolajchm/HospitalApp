const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const adminMiddleware = require('../utils/adminMiddleware');

const auth = require('../controllers/auth.controller');

router.get('/users', auth.users);
router.post('/register', authMiddleware, auth.register); 
router.post('/login', auth.login);
router.delete('/userremove/:id', authMiddleware, auth.delete);
router.delete('/logout', authMiddleware, auth.logout);
router.get('/logged', auth.logged); 

module.exports = router;
