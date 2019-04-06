var Sequelize = require('sequelize');
var dbConfig = require('../config/dbConfig');
var log = require('../log');

var sequelize = new Sequelize(dbConfig.options.dbName, dbConfig.options.username, dbConfig.options.password, {
    dialect: 'mssql',
    host: dbConfig.options.host,
    port: dbConfig.options.port,
    dialectOptions: {
        requestTimeout: 30000
    }
});

sequelize
    .authenticate()
    .then(() => {
        log.Logger.info('Successful connection to SQL Server.');
    })
    .catch(err => {
        log.Logger.error('** SQL Server connection failed: ', err);
        process.exit(1);
    });

var Event = sequelize.define('event', {
    title: Sequelize.STRING,
    detail: Sequelize.STRING,
    date: Sequelize.DATE
});

Event.sync();

exports.Events = Event;