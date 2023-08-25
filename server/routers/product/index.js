'use strict';

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const ProductController = require('../../controllers/product.controller');
const { verifyToken } = require('../../middlewares/verifyToken');
const { isAdmin } = require('../../middlewares/checkAuthorization');

router.post(
	'/product/create-product',
	[verifyToken, isAdmin],
	asyncHandler(ProductController.createProduct),
);

router.get(
	'/product/:pid',
	verifyToken,
	asyncHandler(ProductController.getProduct),
);

router.get(
	'/product',
	verifyToken,
	asyncHandler(ProductController.getProducts),
);

router.patch(
	'/product/:pid',
	[verifyToken, isAdmin],
	asyncHandler(ProductController.updateProduct),
);

router.delete(
	'/product/:pid',
	[verifyToken, isAdmin],
	asyncHandler(ProductController.deleteProduct),
);

module.exports = router;
