const express = require('express');
const router = express.Router();

const user = require('../controllers/users.controller');

router.get('/user', user.user);
router.post('/register', user.register); //do dodania pracownika i admina - potem do usuniecia 

module.exports = router;
