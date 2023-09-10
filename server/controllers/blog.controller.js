'use strict';

const {
	CreatedResponse,
	OkResponse,
} = require('../middlewares/success.response');
const blogServices = require('../services/blog/blog.services');

class BlogController {
	async createBlog(req, res, next) {
		return new CreatedResponse({
			metaData: await blogServices.createBlog(req.body, req.user.id),
			message: 'create blog successfully',
		}).send(res);
	}

	async getBlog(req, res, next) {
		return new OkResponse({
			metaData: await blogServices.getBlog(req?.params?.bid, req.user.id),
			message: 'Get blog',
		}).send(res);
	}

	async getBlogs(req, res, next) {
		return new OkResponse({
			metaData: await blogServices.getBlogs(),
			message: 'Get blogs',
		}).send(res);
	}

	async deleteBlog(req, res, next) {
		return new OkResponse({
			metaData: await blogServices.deleteBlog(req?.params?.bid, req.user.id),
			message: 'delete blog successfully',
		}).send(res);
	}

	async updateBlog(req, res, next) {
		return new OkResponse({
			metaData: await blogServices.updateBlog(req?.params?.bid, req.body),
			message: 'update blog successfully',
		}).send(res);
	}

	async likeBlog(req, res, next) {
		return new OkResponse({
			metaData: await blogServices.likeBlog(req?.params?.bid, req.user.id),
			message: 'like blog successfully',
		}).send(res);
	}

	async dislikeBlog(req, res, next) {
		return new OkResponse({
			metaData: await blogServices.dislikeBlog(req.params?.bid, req.user.id),
		}).send(res);
	}
}

module.exports = new BlogController();
