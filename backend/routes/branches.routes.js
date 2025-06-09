const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const adminMiddleware = require('../utils/adminMiddleware');

const branch = require('../controllers/branches.controller');

router.get('/branches', authMiddleware, branch.branches);
router.get('/branch/:id', authMiddleware, branch.byId);
router.get('/branchHosp/:id', authMiddleware, branch.byHospitalId);

module.exports = router;