'use strict';

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const BlogController = require('../../controllers/blog.controller');

router.get('/blog', asyncHandler(BlogController.getBlogs));

router.get('/blog/:bid', asyncHandler(BlogController.getBlog));

router.post('/blog/create-blog', asyncHandler(BlogController.createBlog));

router.patch('/blog/update-blog/:bid', asyncHandler(BlogController.updateBlog));

router.delete(
	'/blog/delete-blog/:bid',
	asyncHandler(BlogController.deleteBlog),
);
router.post('/blog/like-blog/:bid', asyncHandler(BlogController.likeBlog));

router.post(
	'/blog/dislike-blog/:bid',
	asyncHandler(BlogController.dislikeBlog),
);

module.exports = router;
