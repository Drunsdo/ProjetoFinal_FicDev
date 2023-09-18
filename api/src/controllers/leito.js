const { LeitoModel } = require('../models/leito-model');
const { HttpHelper } = require('../utils/http-helper');

class LeitoController {
    // Cria um novo leito
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { statusLeito, salaIdLeito } = request.body;
            
            if (!statusLeito || !salaIdLeito) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }
            
            const leito = await LeitoModel.create({
                status: statusLeito,
                salaId: salaIdLeito
            });
            
            return httpHelper.created(leito);
        } catch (error) {
            console.error('Erro ao criar um leito:', error);
            return httpHelper.internalError(error);
        }
    }

    // Obtém todos os leitos
    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const leitos = await LeitoModel.findAll();
            return httpHelper.ok(leitos);
        } catch (error) {
            console.error('Erro ao obter todos os leitos:', error);
            return httpHelper.internalError(error);
        }
    }

    // Obtém leitos por status
    async getByStatus(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { status } = request.params;
            
            if (!status) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }

            const leitos = await LeitoModel.findAll({
                where: { status }
            });

            return httpHelper.ok(leitos);
        } catch (error) {
            console.error('Erro ao obter leitos por status:', error);
            return httpHelper.internalError(error);
        }
    }

    // Deleta um leito por ID
    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            
            if (!id) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }

            const leitoExists = await LeitoModel.findByPk(id);
            
            if (!leitoExists) {
                return httpHelper.notFound('Leito não encontrado!');
            }
            
            await LeitoModel.destroy({ where: { id } });
            
            return httpHelper.ok({
                message: 'Leito deletado com sucesso!'
            });
        } catch (error) {
            console.error('Erro ao deletar um leito:', error);
            return httpHelper.internalError(error);
        }
    }


    // Atualiza um leito por ID
    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { statusLeito, dataLeito, pacienteatualLeito, salaIdLeito } = request.body;
            
            if (!id) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }

            const leitoExists = await LeitoModel.findByPk(id);
            
            if (!leitoExists) {
                return httpHelper.notFound('Leito não encontrado!');
            }
            
            await LeitoModel.update({
                status: statusLeito,
                data: dataLeito,
                pacienteatual: pacienteatualLeito,
                salaId: salaIdLeito
            }, {
                where: { id }
            });
            
            return httpHelper.ok({
                message: 'Leito atualizado com sucesso!'
            });
        } catch (error) {
            console.error('Erro ao atualizar um leito:', error);
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { LeitoController };
