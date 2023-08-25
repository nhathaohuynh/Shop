'use strict';

const { BadRequest } = require('../../../middlewares/error.response');
const productCategoryModel = require('../../../models/products/productCategory.model');
const {
	findProductCategoryById,
} = require('../../../models/responsibility/productCategory.res');
class ProductCategoryService {
	async getCategories() {
		const productCategories = await productCategoryModel.find({});
		return {
			productCategories,
		};
	}

	async getCategory(cid) {
		const productCategory = await findProductCategoryById(cid);
		return {
			productCategory,
		};
	}

	async createCategory(category) {
		const productCategory = await productCategoryModel.create(category);
		return {
			productCategory,
		};
	}

	async updateCategory(cid, body) {
		const foundProductCategory = await findProductCategoryById(cid);
		if (!foundProductCategory)
			throw new BadRequest('Cannot update product category not existing');

		const productCategory = await productCategoryModel.findByIdAndUpdate(
			cid,
			body,
			{ new: true },
		);
		return {
			productCategory,
		};
	}

	async deleteCategory(cid) {
		console.log(cid);
		const foundProductCategory = await findProductCategoryById(cid);
		if (!foundProductCategory)
			throw new BadRequest('Cannot delete product category not existing');

		const productCategory = await productCategoryModel.findByIdAndDelete(cid, {
			new: true,
		});
		return {
			productCategory,
		};
	}
}

module.exports = new ProductCategoryService();
