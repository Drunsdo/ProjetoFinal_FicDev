const { Model, DataTypes } = require("sequelize");

class LeitoModel extends Model {
    static init(sequelize) {
        super.init({
            pacienteatual: DataTypes.TEXT,
            data: DataTypes.DATE,
            status: DataTypes.BOOLEAN,
            salaId: DataTypes.INTEGER
        }, {
            sequelize,
            tableName: 'leito',
            timestamps: false
        });
    }

    static associate(models) {
        this.belongsTo(models.SalaModel, { foreignKey: 'salaId' });
    }
}

module.exports = { LeitoModel };
