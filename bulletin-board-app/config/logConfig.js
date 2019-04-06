const winston = require('winston');
var logConfig = module.exports = {};

logConfig.options = {
    transports: [
        new winston.transports.Console({
            level: 'info'
        })
    ]
};
