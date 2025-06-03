const express = require('express');
const router = express.Router();

const attribution = require('../controllers/attribution.controller');

router.get('/allAtribution', attribution.getAllAttribution);

module.exports = router;