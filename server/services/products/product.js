'use strict';

const productModel = require('../../models/products/product.model');
const slug = require('slugify');
const {
	updateProductById,
	deleteProductById,
} = require('../../models/responsibility/product.res');

class Product {
	constructor({
		product_name,
		product_type,
		product_thumb,
		product_sold,
		product_attributes,
		product_description,
		product_price,
		product_shop,
	}) {
		this.product_name = product_name;
		this.product_type = product_type;
		this.product_slug = product_name
			? slug(product_name, {
					lower: true,
					trim: true,
			})
			: null;
		this.product_thumb = product_thumb;
		this.product_sold = product_sold;
		this.product_attributes = product_attributes;
		this.product_description = product_description;
		this.product_price = product_price;
		this.product_shop = product_shop;
	}

	async createProduct(product_id) {
		return await productModel.create({
			...this,
			_id: product_id,
		});
	}

	async updateProduct(productId, bodyUpdate) {
		return await updateProductById({
			productId,
			bodyUpdate,
			model: productModel,
		});
	}

	async deleteProduct(productId) {
		return await deleteProductById({ productId, model: productModel });
	}
}

module.exports = {
	Product,
};
