'use strict';

const { Product } = require('./product');
const electronicModel = require('../../models/products/electronic.product.model');
const { BadRequest } = require('../../middlewares/error.response');
const {
	updateProductById,
	findProductById,
	deleteProductById,
} = require('../../models/responsibility/product.res');

const slug = require('slugify');
const {
	updateNestedObject,
	removeUndefineAndNullObject,
} = require('../../utils');

class Electronic extends Product {
	async createProduct() {
		const electronicProduct = await electronicModel.create({
			...this.product_attributes,
			product_shop: this.product_shop,
		});

		if (!electronicProduct) throw new BadRequest('Create new electronic error');

		const product = await super.createProduct(electronicProduct._id);
		if (!product) throw new BadRequest('Create new electronic product error');
		return { product };
	}

	async updateProduct(productId) {
		const flatObject = updateNestedObject(this);
		const objectParams = removeUndefineAndNullObject(flatObject);

		if (objectParams.product_attributes) {
			await updateProductById({
				productId,
				objectParams,
				model: electronicModel,
			});
		}

		if (objectParams.product_name) {
			objectParams.product_slug = slug(objectParams.product_name);
		}

		const updateProduct = await super.updateProduct(productId, objectParams);

		return {
			product: updateProduct,
		};
	}

	async deleteProduct(productId) {
		const foundProduct = await findProductById(productId);
		if (!foundProduct)
			throw new BadRequest('Cannot delete product not existing');

		const response = await deleteProductById({
			productId,
			model: electronicModel,
		});
		if (!response) throw new BadRequest('Deleting electronic product failed');

		const deletedProduct = await super.deleteProduct(productId);

		return {
			product: deletedProduct,
		};
	}
}

module.exports = Electronic;
