'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Blog';
const COLLECTION_NAME = 'Blogs';
const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		number_views: {
			type: Number,
		},
		images: [
			{
				type: String,
			},
		],
		likes: {
			type: Number,
			default: 0,
		},
		dislikes: {
			type: Number,
			default: 0,
		},
		liked: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		disliked: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
		// toJSON: { virtuals: true },
		// toObject: { virtuals: true }
	},
);

// blogSchema.virtual();

module.exports = model(DOCUMENT_NAME, blogSchema);
