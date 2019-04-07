var Sequelize = require('sequelize');
var dbConfig = require('../config/dbConfig');
var log = require('../log');

log.Logger.debug('Initializing connection to SQL Server: %s', dbConfig.connection.host);

var sequelize = new Sequelize(dbConfig.connection.dbName, dbConfig.connection.username, dbConfig.connection.password, {
    dialect: 'mssql',
    host: dbConfig.connection.host,
    port: dbConfig.connection.port,
    pool: {
        max: dbConfig.pool.max
    },
    dialectOptions: {
        requestTimeout: 30000
    }    
});

sequelize
    .authenticate()
    .then(() => {
        log.Logger.info('Successful connection to SQL Server: %s', dbConfig.connection.host);
        log.Logger.info('--Using connection pool max: %d', dbConfig.pool.max)
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