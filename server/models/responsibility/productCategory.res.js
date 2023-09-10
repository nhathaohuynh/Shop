'use strict';
const productCategoryModel = require('../productCategory/productCategory.model');
class ProductCategoryRes {
	async findProductCategoryById(cid) {
		return await productCategoryModel.findById(cid);
	}
}

module.exports = new ProductCategoryRes();
