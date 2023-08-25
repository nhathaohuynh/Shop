'use strict';

const express = require('express');
const BlogCategoryController = require('../../controllers/blogCategory.controller');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { verifyToken } = require('../../middlewares/verifyToken');

router.get(
	'/blog-category',
	verifyToken,
	asyncHandler(BlogCategoryController.getCategories),
);

router.get(
	'/blog-category/:bid',
	verifyToken,
	asyncHandler(BlogCategoryController.getCategory),
);

router.post(
	'/blog-category/create',
	verifyToken,
	asyncHandler(BlogCategoryController.createCategory),
);

router.patch(
	'/blog-category/update/:bid',
	verifyToken,
	asyncHandler(BlogCategoryController.updateCategory),
);

router.delete(
	'/blog-category/delete/:bid',
	verifyToken,
	asyncHandler(BlogCategoryController.deleteCategory),
);
module.exports = router;
