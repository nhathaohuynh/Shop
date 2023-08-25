'use strict';

const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'ProductCategory';
const COLLECTION_NAME = 'ProductCategories';

const productCatergorySchema = new Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true,
			index: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

module.exports = model(DOCUMENT_NAME, productCatergorySchema);
