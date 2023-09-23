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
            datainicio: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            datafim: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            salaId: { 
                type: Sequelize.INTEGER,
                allowNull: false,
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
