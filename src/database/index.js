const {Sequelize} = require('sequelize');
const {database, username, password, host} = require('../config/db.json');

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql'
});

module.exports = {
    sequelize
}