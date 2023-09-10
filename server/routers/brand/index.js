'use strict';

const express = require('express');
const BrandController = require('../../controllers/brand.controller');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { verifyToken } = require('../../middlewares/verifyToken');

router.get('/brands', verifyToken, asyncHandler(BrandController.getBrands));

router.get('/brand/:bid', verifyToken, asyncHandler(BrandController.getBrand));

router.post(
	'/brand/create',
	verifyToken,
	asyncHandler(BrandController.createBrand),
);

router.patch(
	'/brand/update/:bid',
	verifyToken,
	asyncHandler(BrandController.updateBrand),
);

router.delete(
	'/brand/delete/:bid',
	verifyToken,
	asyncHandler(BrandController.deleteBrand),
);
module.exports = router;
