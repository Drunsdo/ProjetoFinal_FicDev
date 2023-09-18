const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/user-model');

class UserController {
    async register(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, password } = request.body;
            if (!email || !password) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
            const userAlreadyExists = await UserModel.findOne({ where: { email } });
            if (userAlreadyExists) return httpHelper.badRequest('E-mail de usuário já cadastrado!');
            const passwordHashed = await bcrypt.hash(
                password,
                Number(process.env.SALT)
            );
            const user = await UserModel.create({
                email,
                password: passwordHashed,
            });
            if (!user) return httpHelper.badRequest('Houve um erro ao criar usuário');
            const accessToken = jwt.sign(
                { id: user.id },
                `${process.env.TOKEN_SECRET}`,
                { expiresIn: "10h" }
            );
            return httpHelper.created({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async login(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, password } = request.body;
            if (!email || !password) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
            const userExists = await UserModel.findOne({ where: { email } });
            if (!userExists) return httpHelper.notFound('Usuário não encontrado!');
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (!isPasswordValid) return httpHelper.badRequest('Senha incorreta!');
            const accessToken = jwt.sign(
                { id: userExists.id },
                `${process.env.TOKEN_SECRET}`,
                { expiresIn: "10h" }
            );
            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getUser(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const user = await UserModel.findByPk(id);
            return httpHelper.ok(user);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async updateUser(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const userId = request.params.id;
            const { email, password } = request.body;
            const user = await UserModel.findByPk(userId);
            if (!user) return httpHelper.notFound('Usuário não encontrado!');

            if (email) {
                user.email = email;
            }
            if (password) {
                const passwordHashed = await bcrypt.hash(password, Number(process.env.SALT));
                user.password = passwordHashed;
            }

            await user.save();

            return httpHelper.ok(user);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async deleteUser(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const userId = request.params.id;
            const user = await UserModel.findByPk(userId);
            if (!user) return httpHelper.notFound('Usuário não encontrado!');

            await user.destroy();

            return httpHelper.ok('Usuário excluído com sucesso');
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { UserController };
