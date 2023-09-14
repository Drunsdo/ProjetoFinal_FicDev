const { LeitoModel } = require('../models/leito-model');
const { HttpHelper } = require('../utils/http-helper');

class LeitoController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { status, data, pacienteatual, salaId } = request.body;
            if (status === undefined || data === undefined || pacienteatual === undefined || salaId === undefined) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }
            
            const leito = await LeitoModel.create({
                status, data, pacienteatual, salaId
            });
            
            return httpHelper.created(leito);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const leitos = await LeitoModel.findAll();
            return httpHelper.ok(leitos);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getById(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            
            const leito = await LeitoModel.findByPk(id);
            if (!leito) return httpHelper.notFound('Leito não encontrado!');
            
            return httpHelper.ok(leito);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
    

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const leitoExists = await LeitoModel.findOne({ where: { id } });
            if (!leitoExists) return httpHelper.notFound('Leito não encontrado!');
            await LeitoModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Leito deletado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { status, data, pacienteatual, salaId } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const leitoExists = await LeitoModel.findByPk(id);
            if (!leitoExists) return httpHelper.notFound('Leito não encontrado!');
            
            await LeitoModel.update({
                status, data, pacienteatual, salaId
            }, {
                where: { id }
            });
            
            return httpHelper.ok({
                message: 'Leito atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { LeitoController };
