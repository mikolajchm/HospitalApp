const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const branch = require('../controllers/branches.controller');

router.get('/branches', branch.branches);
router.get('/branch/:id', branch.byId);
router.get('/branchHosp/:id', branch.byHospitalId);

module.exports = router;