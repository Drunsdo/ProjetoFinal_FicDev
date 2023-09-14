const { Model, DataTypes } = require("sequelize");

class SalaModel extends Model {
    static init(sequelize) {
        super.init({
            tipo: DataTypes.TEXT,
            quantidadeleitos: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'sala',
            timestamps: false
        });
    }

    static associate(models) {
        this.hasOne(models.LeitoModel, { foreignKey: 'salaId' });
    }

    static associate(models) {
        this.hasOne(models.ReservaModel, { foreignKey: 'salaId' });
    }
}

module.exports = { SalaModel };
