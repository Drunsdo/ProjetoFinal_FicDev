const { HttpHelper } = require('../utils/http-helper');
const { SalaModel } = require('../models/sala-model');
const { Sequelize } = require('sequelize');


class SalaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { tipo, quantidadeleitos } = request.body;
            if (tipo === undefined || quantidadeleitos === undefined) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }

            const sala = await SalaModel.create({
                tipo, quantidadeleitos
            });

            return httpHelper.created(sala);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const salas = await SalaModel.findAll();
            return httpHelper.ok(salas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getQuantidade(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const quantidade = await SalaModel.count();
            return httpHelper.ok(quantidade);
        } catch (error) {
            console.error('Erro ao obter a quantidade total de salas:', error);
            return httpHelper.internalError(error);
        }
    }

    async getQuantidadeTipo(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const quantidade = await SalaModel.findAll({
                attributes: ['tipo', [Sequelize.fn('count', Sequelize.col('tipo')), 'count']],
                group: ['tipo']
            });
            return httpHelper.ok(quantidade);
        } catch (error) {
            console.error('Erro ao obter a quantidade de salas por tipo:', error);
            return httpHelper.internalError(error);
        }
    }

    async getByTipo(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { tipo } = request.params;
            if (!tipo) return httpHelper.badRequest('Parâmetros inválidos!');

            const salas = await SalaModel.findAll({
                where: { tipo }
            });

            return httpHelper.ok(salas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }


    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const salaExists = await SalaModel.findOne({ where: { id } });
            if (!salaExists) return httpHelper.notFound('Sala não encontrado!');
            await SalaModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Sala deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }


    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { tipo, quantidadeleitos } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const salaExists = await SalaModel.findByPk(id);
            if (!salaExists) return httpHelper.notFound('Sala não encontrada!');

            await SalaModel.update({
                tipo, quantidadeleitos
            }, {
                where: { id }
            });

            return httpHelper.ok({
                message: 'Sala atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { SalaController };