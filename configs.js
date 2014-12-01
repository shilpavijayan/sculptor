var dbconfig = require('./config/config.json');
var mcconfig = require('./config/mcconfig.json');
var node_env = process.env.NODE_ENV || 'development';

exports.databaseUrl = function () {
    return dbconfig[node_env];
};

exports.memcachedConfig = function () {
    return mcconfig[node_env];
};
