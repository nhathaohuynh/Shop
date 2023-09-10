'use strict';

const { BadRequest } = require('../../middlewares/error.response');
const brandModel = require('../../models/brand/brand.model');

class BrandService {
	async getBrands() {
		const brands = await brandModel.find({});
		return {
			brands,
		};
	}

	async getBrand(bid) {
		const brand = await brandModel.findById(bid);
		return {
			brand,
		};
	}

	async createBrand(body) {
		const brand = await brandModel.create(body);
		return {
			brand,
		};
	}

	async updateBrand(bid, body) {
		const foundBrand = await brandModel.findById(bid);
		if (!foundBrand)
			throw new BadRequest('Cannot update blog brand not existing');
		const brand = await brandModel.findByIdAndUpdate(bid, body, {
			new: true,
		});
		return {
			brand,
		};
	}

	async deleteBrand(bid) {
		const foundBrand = await brandModel.findById(bid);
		if (!foundBrand)
			throw new BadRequest('Cannot delete blog Brand not existing');

		const brand = await brandModel.findByIdAndDelete(bid, {
			new: true,
		});
		return {
			brand,
		};
	}
}

module.exports = new BrandService();
