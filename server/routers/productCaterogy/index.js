'use strict';

const express = require('express');
const productCategoryController = require('../../controllers/blogCategory.controller');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { verifyToken } = require('../../middlewares/verifyToken');

router.get(
	'/product-category',
	verifyToken,
	asyncHandler(productCategoryController.getCategories),
);

router.get(
	'/product-category/:cid',
	verifyToken,
	asyncHandler(productCategoryController.getCategory),
);

router.post(
	'/product-category/create',
	verifyToken,
	asyncHandler(productCategoryController.createCategory),
);

router.patch(
	'/product-category/update/:cid',
	verifyToken,
	asyncHandler(productCategoryController.updateCategory),
);

router.delete(
	'/product-category/delete/:cid',
	verifyToken,
	asyncHandler(productCategoryController.deleteCategory),
);
module.exports = router;
