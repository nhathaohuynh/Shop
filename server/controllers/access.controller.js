'use strict'

const {
	CreatedResponse,
	OkResponse,
} = require('../middlewares/success.response')
const AccessServices = require('../services/access/access.services')
const { addCookie, clearCookie } = require('../middlewares/cookie')

class AccessController {
	async signUp(req, res, next) {
		const data = await AccessServices.signUp(req.body)
		res.cookie('authen', data, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			optionsSuccessStatus: 200,
			maxAge: 10 * 60 * 1000,
		})

		return new CreatedResponse({
			message: 'Please check your email to active account',
		}).send(res)
	}

	async authenRegister(req, res, next) {
		const payload = req.cookies.authen
		const tokenParam = req.params.token
		res.clearCookie('authen', { httpOnly: true, secure: true })
		return new OkResponse({
			metaData: await AccessServices.authenRegister(payload, tokenParam, res),
		})
	}

	async login(req, res, next) {
		const data = await AccessServices.login(req.body, res)
		return new OkResponse({
			metaData: data,
			message: 'Login successful',
		}).send(res)
	}

	async getUser(req, res, next) {
		return new OkResponse({
			metaData: await AccessServices.getUser(req.user),
			message: 'Get infomation User successfully',
		}).send(res)
	}

	async refreshToken(req, res, next) {
		return new OkResponse({
			metaData: await AccessServices.refreshToken(req.user),
			message: 'refresh token is successfully ',
		}).send(res)
	}

	async logout(req, res, next) {
		const data = await AccessServices.logout(req.user)
		clearCookie(res)

		return new OkResponse({
			metaData: data,
			message: 'Logout successfully',
		}).send(res)
	}

	async changePassword(req, res, next) {
		const data = {
			...req.body,
			...req.user,
		}

		return new OkResponse({
			metaData: await AccessServices.changePassword(data),
			message: 'Ok',
		}).send(res)
	}

	async forgotPassword(req, res, next) {
		return new OkResponse({
			metaData: await AccessServices.forgotPassword(req.body),
			message: 'Check email to authenticate new password',
		}).send(res)
	}

	async comfirmPassword(req, res, next) {
		return new OkResponse({
			metaData: await AccessServices.comfirmPassword(req.infoUser, res),
			message: 'Change password successfully',
		}).send(res)
	}

	async getUsers(req, res, next) {
		return new OkResponse({
			metaData: await AccessServices.getUsers(),
			message: 'All Users',
		}).send(res)
	}

	async removeUser(req, res, next) {
		return new OkResponse({
			metaData: await AccessServices.removeUser(req.params),
			message: 'OK',
		}).send(res)
	}

	async updateUser(req, res, next) {
		const data = {
			body: req.body,
			id: req.user.id,
		}
		return new OkResponse({
			metaData: await AccessServices.updateUser(data),
			message: 'Updated',
		}).send(res)
	}

	async updateUserByAdmin(req, res, next) {
		const data = {
			body: req.body,
			id: req.params?.id,
		}
		return new OkResponse({
			metaData: await accessServices.updateUserByAdmin(data),
			message: 'Updated',
		}).send(res)
	}
}

module.exports = new AccessController()
