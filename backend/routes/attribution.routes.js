const express = require('express');
const router = express.Router();

const attribution = require('../controllers/attribution.controller');

router.get('/attributions', attribution.attributions); 
router.get('/attribution/:id', attribution.getById);
router.delete('/attribution/:id', attribution.delete);
router.put('/attribution/:id', attribution.edit);

module.exports = router;