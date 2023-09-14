const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { LeitoModel } = require('../models/leito-model');
const { UserModel } = require('../models/user-model');
const {ReservaModel} = require('../models/reserva-model');
const {SalaModel} = require('../models/sala-model');


const database = new Sequelize(configDatabase);

LeitoModel.init(database);
UserModel.init(database);
ReservaModel.init(database);
SalaModel.init(database);

module.exports = database;
