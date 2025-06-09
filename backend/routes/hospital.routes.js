const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const hospital = require('../controllers/hospitals.controller');

router.get('/hospitals', authMiddleware, hospital.hospitals);
router.get('/hospital/:id', authMiddleware, hospital.getById);

module.exports = router;