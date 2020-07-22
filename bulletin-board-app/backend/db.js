var Sequelize = require('sequelize');
var username = process.env.DB_USER;
var password = fs.readFileSync('/run/secrets/passwd','utf8').trim();
var host = process.env.DB_HOST;
var dbName = process.env.DB_NAME;

var sequelize = new Sequelize(dbName, username, password, {
    dialect: 'postgres',
    host: host,
    port: 5432,
    omitNull: true,
    define: {
        timestamps: false
    },
    dialectOptions: {
        requestTimeout: 30000,
        encrypt: false
    },
    operatorsAliases: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Successful connection to SQL Server.');
    })
    .catch(err => {
        console.error('** SQL Server connection failed: ', err);
        process.exit(1);
    });

var Event = sequelize.define('event', {
    title: Sequelize.STRING,
    detail: Sequelize.STRING,
    date: Sequelize.DATE
});

Event.sync();

exports.Events = Event;
