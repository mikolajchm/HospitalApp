const express = require('express');
const router = express.Router();
const adminMiddleware = require('../utils/adminMiddleware');

const patient = require('../controllers/patients.controller');

router.get('/allPatients', patient.allPatients);
router.post('/patient', patient.postPatient); // tu dodaj adminMiddleware
router.get('/patient/:id', patient.getPatientbyId);
router.delete('/patient/:id', patient.deletePatient); // tu dodaj adminMiddleware


module.exports = router;