const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();

router.use('/api/v1', require('./access'));
router.use('/api/v1', require('./product'));
router.use('/api/v1', require('./rating'));
router.use('/api/v1', require('./productCaterogy'));
router.use('/api/v1', require('./blogCaterogy'));
router.use('/api/v1', require('./brand'));
router.use(verifyToken);
router.use('/api/v1', require('./blog'));

module.exports = router;
