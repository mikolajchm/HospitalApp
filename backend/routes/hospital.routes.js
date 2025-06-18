const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const hospital = require('../controllers/hospitals.controller');

router.get('/hospitals', hospital.hospitals);
router.get('/hospital/:id', hospital.getById);

module.exports = router;