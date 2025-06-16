const express = require('express');
const router = express.Router();
const authMidlleware = require('../utils/authMiddleware');

const patient = require('../controllers/patients.controller');

router.get('/allPatients', patient.patients);
router.post('/patient', authMidlleware, patient.post); 
router.get('/patient/:id', authMidlleware, patient.getById);
router.delete('/patient/:id', authMidlleware, patient.delete); 
router.put('/patient/:id', authMidlleware, patient.edit);

module.exports = router;