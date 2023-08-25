'use strict';

const { Product } = require('./product');
const clothingModel = require('../../models/products/clothing.product.model');
const { BadRequest } = require('../../middlewares/error.response');
const {
	updateProductById,
	deleteProductById,
} = require('../../models/responsibility/product.res');
const slug = require('slugify');
const {
	updateNestedObject,
	removeUndefineAndNullObject,
} = require('../../utils');

class Clothing extends Product {
	async createProduct() {
		const clothingProduct = await clothingModel.create({
			...this.product_attributes,
			product_shop: this.product_shop,
		});

		if (!clothingProduct) throw new BadRequest('Create new clothing error');

		const product = await super.createProduct(clothingProduct._id);
		if (!product) throw new BadRequest('Create new clothing product error');
		return product;
	}

	async updateProduct(productId) {
		const flatObject = updateNestedObject(this);
		const objectParams = removeUndefineAndNullObject(flatObject);

		if (objectParams.product_attributes) {
			await updateProductById({
				productId,
				objectParams,
				model: clothingModel,
			});
		}

		if (objectParams.product_name) {
			objectParams.product_slug = slug(objectParams.product_name);
		}
		const updateProduct = await super.updateProduct(productId, objectParams);

		return updateProduct;
	}

	async deleteProduct(productId) {
		const foundProduct = await findProductById(productId);
		if (!foundProduct)
			throw new BadRequest('Cannot delete product not existing');

		const response = await deleteProductById({
			productId,
			model: clothingModel,
		});
		if (!response) throw new BadRequest('Deleting electronic product failed');

		const deletedProduct = await super.deleteProduct(productId);

		return deletedProduct;
	}
}

module.exports = Clothing;
