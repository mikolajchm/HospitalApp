const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const adminMiddleware = require('../utils/adminMiddleware');

const branch = require('../controllers/branch.controller');

router.get('/branches', authMiddleware, branch.branchs);
router.get('/branch/:id', authMiddleware, branch.byId);
router.get('/branchHosp/:id', authMiddleware, branch.byHospitalId);

module.exports = router;