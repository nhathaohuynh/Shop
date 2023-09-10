'use strict';

const {
	OkResponse,
	CreatedResponse,
} = require('../middlewares/success.response');

const BrandService = require('../services/brand/brand.services');

class BrandController {
	async getBrand(req, res, next) {
		const bid = req.params.bid;
		return new OkResponse({
			metaData: await BrandService.getBrand(bid),
			message: 'OK',
		}).send(res);
	}
	async getBrands(req, res, next) {
		return new OkResponse({
			metaData: await BrandService.getBrands(),
			message: 'OK',
		}).send(res);
	}

	async createBrand(req, res, next) {
		const body = req.body;
		return new CreatedResponse({
			metaData: await BrandService.createBrand(body),
			message: 'OK',
		}).send(res);
	}

	async updateBrand(req, res, next) {
		const body = req.body;
		const bid = req.params.bid;
		return new OkResponse({
			metaData: await BrandService.updateBrand(bid, body),
			message: 'OK',
		}).send(res);
	}

	async deleteBrand(req, res, next) {
		const bid = req.params.bid;
		return new OkResponse({
			metaData: await BrandService.deleteBrand(bid),
			message: 'OK',
		}).send(res);
	}
}

module.exports = new BrandController();
