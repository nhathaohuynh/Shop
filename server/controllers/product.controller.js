'use strict';
const {
	CreatedResponse,
	OkResponse,
} = require('../middlewares/success.response');
const productServices = require('../services/products/product.services');
const ProductService = require('../services/products/product.services');

class ProductController {
	async createProduct(req, res, next) {
		const payload = {
			...req.body,
			product_shop: req.user.id,
		};
		const type = req.body.product_type;
		return new CreatedResponse({
			metaData: await ProductService.createProduct(type, payload),
			message: 'Cretaed product successfully ',
		}).send(res);
	}

	async updateProduct(req, res, next) {
		const type = req.body.product_type;
		const productId = req.params.pid;
		const payload = {
			...req.body,
		};

		return new OkResponse({
			metaData: await ProductService.updateProduct(type, productId, payload),
			message: 'Ok',
		}).send(res);
	}

	async deleteProduct(req, res, next) {
		const type = req.body.product_type;
		const productId = req.params.pid;

		return new OkResponse({
			metaData: await ProductService.deleteProduct(type, productId),
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
			metaData: await productServices.getProducts(queries),
			message: 'OK',
		}).send(res);
	}
}

module.exports = new ProductController();
