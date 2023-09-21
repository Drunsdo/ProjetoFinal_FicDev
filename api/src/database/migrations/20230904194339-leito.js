'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('leito', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            pacienteatual: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            data: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false
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
        await queryInterface.dropTable('leito');
    }
};
