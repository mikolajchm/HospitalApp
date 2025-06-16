const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const attribution = require('../controllers/attributions.controller');

router.get('/attributions', attribution.attributions); 
router.get('/attribution/:id', authMiddleware, attribution.getById);
router.delete('/attribution/:id', authMiddleware, attribution.delete);
router.put('/attribution/:id', authMiddleware, attribution.edit);
router.post('/attribution', authMiddleware, attribution.post);
router.get('/attributionByBranch/:id', authMiddleware, attribution.byBranch);
router.get('/attributionByHospital/:id', authMiddleware, attribution.byHospital);
router.get('/attributionByDoctor/:id', authMiddleware, attribution.byDoctor);
router.get('/attributionByPatient/:id', authMiddleware, attribution.byPatient);

module.exports = router;