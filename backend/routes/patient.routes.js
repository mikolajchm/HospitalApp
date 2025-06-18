const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const patient = require('../controllers/patients.controller');

router.get('/allPatients', patient.patients);
router.post('/patient', authMiddleware, patient.post); 
router.get('/patient/:id', patient.getById);
router.delete('/patient/:id', authMiddleware, patient.delete); 
router.put('/patient/:id', authMiddleware, patient.edit);

module.exports = router;