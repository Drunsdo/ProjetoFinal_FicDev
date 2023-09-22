const { ReservaModel } = require('../models/reserva-model');
const { HttpHelper } = require('../utils/http-helper');


class ReservaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { horainicio, data, responsavel, horafim, salaId } = request.body;
            if (horainicio === undefined || data === undefined || responsavel === undefined || salaId === undefined || horafim === undefined) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }
            if (horafim === horainicio) return httpHelper.badRequest('Parâmetros inválidos!');
            const verificarReservas = await ReservaModel.findAll();


            for (const reserva of verificarReservas) {
                if (reserva.data === data && reserva.salaId === salaId) {
                    if (horafim > reserva.horainicio && horainicio < reserva.horafim) {
                        return httpHelper.badRequest('Horário já reservado!');
                    }
                }
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

    async getBySalaId(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { salaId } = request.params;
            if (!salaId) return httpHelper.badRequest('Parâmetros inválidos!');

            const reservas = await ReservaModel.findAll({
                where: { salaId }
            });

            return httpHelper.ok(reservas);
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
            const { horainicio, data, responsavel, horafim, salaId } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const reservaExists = await ReservaModel.findByPk(id);
            if (!reservaExists) return httpHelper.notFound('reserva não encontrado!');

            if (horafim === horainicio) {
                return this.httpHelper.badRequest('Parâmetros inválidos!');
            }

            const verificarReservas = await ReservaModel.findAll

            for (const reserva of verificarReservas) {
                if (reserva.data === data && reserva.salaId === salaId) {
                    if (horafim > reserva.horainicio && horainicio < reserva.horafim) {
                        return httpHelper.badRequest('Horário já reservado!');
                    }
                }
            }

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