// if NODE_ENV='test' return test (local) MongoDB uri
var config = require('./config.global');

config.env = 'test';
config.hostname = 'localhost';

// mongo database
config.mongo.db = 'portfolio';
config.mongo.uri = 'mongodb://localhost:27017/portfolio';

module.exports = config;