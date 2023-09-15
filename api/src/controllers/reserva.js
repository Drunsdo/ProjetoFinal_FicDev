const { ReservaModel } = require('../models/reserva-model');
const { HttpHelper } = require('../utils/http-helper');


class ReservaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { horainicio, data, responsavel, horafim, salaId } = request.body;
            if (horainicio === undefined || data === undefined || responsavel === undefined || salaId === undefined) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }
            
            const reserva = await ReservaModel.create({
                horainicio, data, responsavel, horafim, salaId
            });
            
            return httpHelper.created(reserva);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const reservas = await ReservaModel.findAll();
            return httpHelper.ok(reservas);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getById(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            
            const reserva = await ReservaModel.findByPk(id);
            if (!reserva) return httpHelper.notFound('Reserva não encontrada!');
            
            return httpHelper.ok(reserva);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
    

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const reservaExists = await ReservaModel.findOne({ where: { id } });
            if (!reservaExists) return httpHelper.notFound('Reserva não encontrada!');
            await ReservaModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Reserva deletada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { horainicio, data, responsavel,horafim, salaId } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const reservaExists = await ReservaModel.findByPk(id);
            if (!reservaExists) return httpHelper.notFound('reserva não encontrado!');
            
            await ReservaModel.update({
                horainicio, data, responsavel, horafim, salaId
            }, {
                where: { id }
            });
            
            return httpHelper.ok({
                message: 'Reserva atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { ReservaController };