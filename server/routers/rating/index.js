'use strict';

const express = require('express');
const { verifyToken } = require('../../middlewares/verifyToken');
const asyncHandler = require('express-async-handler');
const ratingController = require('../../controllers/rating.controller');
const router = express.Router();

// router.use(verifyToken);

router.post(
	'/rating',
	verifyToken,
	asyncHandler(ratingController.createRating),
);

router.delete(
	'/rating/:id',
	verifyToken,
	asyncHandler(ratingController.deleteRating),
);

module.exports = router;
