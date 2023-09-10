'use strict';

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const ProductController = require('../../controllers/product.controller');
const { verifyToken } = require('../../middlewares/verifyToken');
const { isAdmin } = require('../../middlewares/checkAuthorization');
const uploader = require('../../config/cloudinary');

router.post(
	'/product/create-product',
	[verifyToken, isAdmin],
	asyncHandler(ProductController.createProduct),
);

router.post(
	'/product/upload-product',
	[verifyToken],
	uploader.single('image'),
	asyncHandler(ProductController.uploadProduct),
);

router.get('/product/:pid', asyncHandler(ProductController.getProduct));

router.get('/product', asyncHandler(ProductController.getProducts));

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
