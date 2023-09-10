'use strict';

const { BadRequest, Forbidden } = require('../../middlewares/error.response');
const blogModel = require('../../models/blog/blog.model');

class Blog {
	async createBlog(body, userId) {
		const blogData = {
			...body,
			author: userId,
		};
		const blog = await blogModel.create(blogData);

		return {
			blog,
		};
	}
	async getBlog(bid) {
		const foundBlog = await blogModel
			.findById(bid)
			.populate('author', { username: 1, email: 1 });
		if (!foundBlog) throw new BadRequest('Cannot get blog not existing');
		return {
			blog: foundBlog,
		};
	}

	async getBlogs() {
		const blogs = await blogModel.find({});
		return {
			blogs,
		};
	}

	async deleteBlog(bid, userId) {
		const foundBlog = await blogModel.findById(bid);
		if (!foundBlog) throw new BadRequest('Cannot delete blog not existing');

		const isAuthor = foundBlog.author === userId;
		if (!isAuthor) throw new Forbidden('Error cannot delete the post');

		const blog = await blogModel.findByIdAndDelete(bid, { new: true });
		return {
			blog,
		};
	}
	async updateBlog(bid, body) {
		const foundBlog = await blogModel.findById(bid);
		if (!foundBlog)
			throw new BadRequest('Cannot update blog without not existing');

		const blog = await blogModel.findByIdAndUpdate(bid, body, { new: true });
		return {
			blog,
		};
	}

	async likeBlog(bid, userId) {
		const foundBlog = await blogModel.findById(bid);
		if (!foundBlog) throw new BadRequest('Error Blog is not existing');

		const alreadyDislike = foundBlog.disliked.find(
			(el) => el.toString() === userId,
		);

		if (alreadyDislike) {
			await blogModel.findByIdAndUpdate(
				bid,
				{
					$pull: { disliked: userId },
					$inc: { dislikes: -1 },
				},
				{ new: true },
			);
		}

		const isLiked = foundBlog.liked.find((el) => el.toString() === userId);
		if (isLiked) {
			const response = await blogModel.findByIdAndUpdate(
				bid,
				{
					$pull: { liked: userId },
					$inc: { likes: -1 },
				},
				{ new: true },
			);
			return {
				data: response,
			};
		} else {
			const response = await blogModel.findByIdAndUpdate(
				bid,
				{
					$push: { liked: userId },
					$inc: { likes: +1 },
				},
				{ new: true },
			);
			return {
				data: response,
			};
		}
	}

	async dislikeBlog(bid, userId) {
		const foundBlog = await blogModel.findById(bid);
		if (!foundBlog) throw new BadRequest('Erorr cannot find the blog');

		const alreadyLiked = foundBlog?.liked.find(
			(el) => el.toString() === userId,
		);
		if (alreadyLiked) {
			await blogModel.findByIdAndUpdate(
				bid,
				{
					$pull: { liked: userId },
					$inc: { likes: -1 },
				},
				{ new: true },
			);
		}

		const isDisliked = foundBlog?.disliked.find(
			(el) => el.toString() === userId,
		);
		if (isDisliked) {
			const response = await blogModel.findByIdAndUpdate(
				bid,
				{
					$pull: { disliked: userId },
					$inc: { dislikes: -1 },
				},
				{ new: true },
			);
			return {
				data: response,
			};
		} else {
			console.log('aaa');
			const response = await blogModel.findByIdAndUpdate(
				bid,
				{
					$push: { disliked: userId },
					$inc: { dislikes: +1 },
				},
				{ new: true },
			);
			return {
				data: response,
			};
		}
	}
}

module.exports = new Blog();
