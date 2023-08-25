'use strict';

const { Schema, model } = require('mongoose');
const DOCUMENT_NAME = 'BlogCategory';
const COLLECTION_NAME = 'BlogCategories';

const blogCategorySchema = new Schema(
	{
		title: {
			type: String,
			unique: true,
			index: true,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

module.exports = model(DOCUMENT_NAME, blogCategorySchema);
