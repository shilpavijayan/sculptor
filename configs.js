var dbconfig = require('./config/config.json');
var node_env = process.env.NODE_ENV || 'development';

exports.databaseUrl = function () {
    return dbconfig[node_env];
};
