const express = require('express');
const router = express.Router();

router.use('/api/v1', require('./access'));
router.use('/api/v1', require('./product'));
router.use('/api/v1', require('./rating'));
router.use('/api/v1', require('./productCaterogy'));
router.use('/api/v1', require('./blogCaterogy'));

module.exports = router;
