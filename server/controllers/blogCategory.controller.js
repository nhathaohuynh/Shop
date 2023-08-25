'use strict';

const {
	OkResponse,
	CreatedResponse,
} = require('../middlewares/success.response');

const BlogCategoryService = require('../services/blog/blogCategory.services');

class BlogCategoryController {
	async getCategory(req, res, next) {
		const bid = req.params.bid;
		return new OkResponse({
			metaData: await BlogCategoryService.getCategory(bid),
			message: 'OK',
		}).send(res);
	}
	async getCategories(req, res, next) {
		return new OkResponse({
			metaData: await BlogCategoryService.getCategories(),
			message: 'OK',
		}).send(res);
	}

	async createCategory(req, res, next) {
		const body = req.body;
		return new CreatedResponse({
			metaData: await BlogCategoryService.createCategory(body),
			message: 'OK',
		}).send(res);
	}

	async updateCategory(req, res, next) {
		const body = req.body;
		const bid = req.params.bid;
		return new OkResponse({
			metaData: await BlogCategoryService.updateCategory(bid, body),
			message: 'OK',
		}).send(res);
	}

	async deleteCategory(req, res, next) {
		const bid = req.params.bid;
		return new OkResponse({
			metaData: await BlogCategoryService.deleteCategory(bid),
			message: 'OK',
		}).send(res);
	}
}

module.exports = new BlogCategoryController();
