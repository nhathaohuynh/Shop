'use strict';

const { BadRequest } = require('../../middlewares/error.response');
const blogCategoryModel = require('../../models/Blog/blogCategory.model');

class BlogCategoryService {
	async getCategories() {
		const blogCategories = await blogCategoryModel.find({});
		return {
			blogCategories,
		};
	}

	async getCategory(bid) {
		const blogCategories = await blogCategoryModel.findById(bid);
		return {
			blogCategories,
		};
	}

	async createCategory(category) {
		const blogCategories = await blogCategoryModel.create(category);
		return {
			blogCategories,
		};
	}

	async updateCategory(bid, body) {
		const foundBlogCategory = await blogCategoryModel.findById(bid);
		if (!foundBlogCategory)
			throw new BadRequest('Cannot update blog category not existing');

		const blogCategory = await blogCategoryModel.findByIdAndUpdate(bid, body, {
			new: true,
		});
		return {
			blogCategory,
		};
	}

	async deleteCategory(bid) {
		const foundBlogCategory = await blogCategoryModel.findById(bid);
		if (!foundBlogCategory)
			throw new BadRequest('Cannot delete blog category not existing');

		const blogCategory = await blogCategoryModel.findByIdAndDelete(bid, {
			new: true,
		});
		return {
			blogCategory,
		};
	}
}

module.exports = new BlogCategoryService();
