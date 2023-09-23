const { Model, DataTypes } = require("sequelize");

class ReservaModel extends Model {
    static init(sequelize) {
        super.init({
            responsavel: DataTypes.TEXT,
            datainicio: DataTypes.DATE,
            datafim: DataTypes.DATE,
            salaId: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'reserva',
            timestamps: false
        });
    }
    static associate(models) {
        this.belongsTo(models.SalaModel, { foreignKey: 'salaId' });
    }
}

module.exports = { ReservaModel };
