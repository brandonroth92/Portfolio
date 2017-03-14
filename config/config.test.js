var config = require('./config.global');

config.env = 'test';

config.mongo.hostname = 'localhost';
config.mongo.db = 'portfolio';
config.mongo.uri = 'mongodb://localhost:27017/portfolio';

module.exports = config;