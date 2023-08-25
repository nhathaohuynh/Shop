'use strict';

const { Schema, model, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

// Declare the Schema of the Mongo model
const userSchema = new Schema(
	{
		username: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
		},
		password: {
			type: String,
		},
		role: {
			type: String,
			default: 'user',
		},
		cart: {
			type: Array,
			default: [],
		},
		address: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Address',
			},
		],
		wishlist: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Product',
			},
		],
		isBlocked: {
			type: Boolean,
			default: false,
		},
		refreshToken: {
			type: String,
		},

		passwordChangeAt: {
			type: Date,
		},
		passwordResetToken: {
			type: String,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
});

userSchema.methods.isCorrectPassword = function (password) {
	return bcrypt.compare(password, this.password);
};
//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
