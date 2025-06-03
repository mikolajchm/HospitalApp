const express = require('express');
const router = express.Router();

const patient = require('../controllers/patients.controller');

router.get('/allPatients', patient.allPatients);
router.post('/patient', patient.postPatient);
router.get('/patient/:id', patient.getPatientbyId);
router.delete('/patient/:id', patient.deletePatient);


module.exports = router;