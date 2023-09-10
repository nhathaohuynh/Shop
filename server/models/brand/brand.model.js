'use strict';

const { Schema, model } = require('mongoose');
const DOCUMENT_NAME = 'Brand';
const COLLECTION_NAME = 'Brands';

const brandSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

module.exports = model(DOCUMENT_NAME, brandSchema);
