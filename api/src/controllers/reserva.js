const { ReservaModel } = require('../models/reserva-model');
const { HttpHelper } = require('../utils/http-helper');
const { Op } = require('sequelize');


class ReservaController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);

        try {
            const { datainicio, datafim, responsavel, salaId } = request.body;

            if (datainicio === undefined || datafim === undefined || responsavel === undefined || salaId === undefined) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }

            if (datainicio === datafim) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }

            const verificarReservas = await ReservaModel.findAll({
                where: {
                    salaId: salaId,
                    datainicio: { [Op.lt]: datafim },
                    datafim: { [Op.gt]: datainicio }
                }
            });

            if (verificarReservas.length > 0) {
                return httpHelper.badRequest('Horário já reservado!');
            }

            const reserva = await ReservaModel.create({
                datainicio, datafim, responsavel, salaId
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

    async getQuantidade(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const quantidade = await ReservaModel.count();
            return httpHelper.ok(quantidade);
        } catch (error) {
            console.error('Erro ao obter a quantidade total de reservas:', error);
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
            const { datainicio, datafim, responsavel, salaId } = request.body;
    
            if (!id || datainicio === undefined || datafim === undefined || responsavel === undefined || salaId === undefined) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }
    
            const reservaExists = await ReservaModel.findByPk(id);
            if (!reservaExists) {
                return httpHelper.notFound('Reserva não encontrado!');
            }
    
            if (datainicio === datafim) {
                return httpHelper.badRequest('Parâmetros inválidos!');
            }
    
            // Consulta todas as reservas existentes na mesma sala que têm conflito de horário, excluindo a própria reserva que está sendo atualizada
            const verificarReservas = await ReservaModel.findAll({
                where: {
                    salaId: salaId,
                    datainicio: { [Op.lt]: datafim },
                    datafim: { [Op.gt]: datainicio },
                    id: { [Op.ne]: id } // Exclui a própria reserva que está sendo atualizada
                }
            });
    
            if (verificarReservas.length > 0) {
                return httpHelper.badRequest('Horário já reservado!');
            }
    
            await ReservaModel.update({
                datainicio, datafim, responsavel, salaId
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