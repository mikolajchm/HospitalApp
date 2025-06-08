const express = require('express');
const router = express.Router();

const attribution = require('../controllers/attribution.controller');

router.get('/attributions', attribution.attributions); 
router.get('/attribution/:id', attribution.getById);
router.delete('/attribution/:id', attribution.delete);
router.put('/attribution/:id', attribution.edit);
router.post('/attribution', attribution.post);
router.get('/attributionByBranch/:id', attribution.byBranch);
router.get('/attributionByHospital/:id', attribution.byHospital);
router.get('/attributionByDoctor/:id', attribution.byDoctor);
router.get('/attributionByPatient/:id', attribution.byPatient);

module.exports = router;