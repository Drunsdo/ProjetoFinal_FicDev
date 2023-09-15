'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('reserva', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            responsavel: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            data: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            horainicio: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            horafim: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            salaId: { 
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'sala',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('reserva');
    }
};
