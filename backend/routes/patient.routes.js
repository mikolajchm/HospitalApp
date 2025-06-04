const express = require('express');
const router = express.Router();
const adminMiddleware = require('../utils/adminMiddleware');

const patient = require('../controllers/patients.controller');

router.get('/allPatients', patient.patients);
router.post('/patient', patient.post); // tu dodaj adminMiddleware
router.get('/patient/:id', patient.getById);
router.delete('/patient/:id', patient.delete); // tu dodaj adminMiddleware
router.put('/patient/:id', patient.edit);

module.exports = router;