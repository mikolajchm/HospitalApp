const express = require('express');
const router = express.Router();
const authMidlleware = require('../utils/authMiddleware');

const patient = require('../controllers/patients.controller');

router.get('/allPatients', patient.patients);
router.post('/patient', patient.post); 
router.get('/patient/:id', patient.getById);
router.delete('/patient/:id', patient.delete); 
router.put('/patient/:id', patient.edit);

module.exports = router;