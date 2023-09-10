'use strict';

const { roundedNumber } = require('../../utils');
const productModel = require('../product/product.model');

class ProductRes {
	async findProductById(pid) {
		return await productModel.findById(pid);
	}

	async updateProductById({ productId, bodyUpdate, model }) {
		return await model.findByIdAndUpdate(productId, bodyUpdate, { new: true });
	}

	async deleteProductById({ productId, model }) {
		return model.findByIdAndDelete(productId);
	}

	async updateTotalRating(pid) {
		const foundProduct = await productModel.findById(pid);
		if (!foundProduct)
			throw new BadRequest('Cannot remove rating for product not existing');
		const amountRating = foundProduct?.product_rating.length;

		const averageRating =
			foundProduct?.product_rating.reduce((accum, el) => el?.star + accum, 0) /
			amountRating;

		foundProduct.product_average_rating = roundedNumber(averageRating);

		await foundProduct.save();
	}

	async updateRating(condition, body) {
		await productModel.updateOne(condition, body, {
			new: true,
		});
	}
}

module.exports = new ProductRes();
