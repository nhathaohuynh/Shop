'use strict';
const {
	CreatedResponse,
	OkResponse,
} = require('../middlewares/success.response');
const ProductService = require('../services/product/product.services');

class ProductController {
	async createProduct(req, res, next) {
		return new CreatedResponse({
			metaData: await ProductService.createProduct(req.body),
			message: 'Cretaed product successfully ',
		}).send(res);
	}

	async updateProduct(req, res, next) {
		const productId = req.params.pid;

		return new OkResponse({
			metaData: await ProductService.updateProduct(productId, req.body),
			message: 'Ok',
		}).send(res);
	}

	async deleteProduct(req, res, next) {
		const productId = req.params.pid;

		return new OkResponse({
			metaData: await ProductService.deleteProduct(productId),
			message: 'Ok',
		}).send(res);
	}

	async getProduct(req, res, next) {
		const { pid } = req.params;
		return new OkResponse({
			metaData: await ProductService.getProduct(pid),
			message: 'Ok',
		}).send(res);
	}

	async getProducts(req, res, next) {
		const queries = req.query;
		return new OkResponse({
			metaData: await ProductService.getProducts(queries),
			message: 'OK',
		}).send(res);
	}

	async uploadProduct(req, res, next) {
		console.log(req.body.name);
		return new OkResponse({
			metaData: await ProductService.uploadProduct(req.file),
			message: 'OK',
		}).send(res);
	}
}

module.exports = new ProductController();
