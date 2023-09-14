const { HttpHelper } = require('../utils/http-helper');
const { SalaModel } = require('../models/sala-model');


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

    async getById(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            
            const sala = await SalaModel.findByPk(id);
            if (!sala) return httpHelper.notFound('Sala não encontrada!');
            
            return httpHelper.ok(sala);
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