'use strict';

const {
	OkResponse,
	CreatedResponse,
} = require('../middlewares/success.response');

const ProductCategoryService = require('../services/productCategory');

class ProductCategoryController {
	async getCategory(req, res, next) {
		const cid = req.params.cid;
		return new OkResponse({
			metaData: await ProductCategoryService.getCategory(cid),
			message: 'OK',
		}).send(res);
	}
	async getCategories(req, res, next) {
		return new OkResponse({
			metaData: await ProductCategoryService.getCategories(),
			message: 'OK',
		}).send(res);
	}

	async createCategory(req, res, next) {
		const body = req.body;
		return new CreatedResponse({
			metaData: await ProductCategoryService.createCategory(body),
			message: 'OK',
		}).send(res);
	}

	async updateCategory(req, res, next) {
		const body = req.body;
		const cid = req.params.cid;
		return new OkResponse({
			metaData: await ProductCategoryService.updateCategory(cid, body),
			message: 'OK',
		}).send(res);
	}

	async deleteCategory(req, res, next) {
		const cid = req.params.cid;
		return new OkResponse({
			metaData: await ProductCategoryService.deleteCategory(cid),
			message: 'OK',
		}).send(res);
	}
}

module.exports = new ProductCategoryController();
