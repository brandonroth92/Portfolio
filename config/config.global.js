var config = module.exports = {};

config.env = 'production';
config.hostname = 'heroku';

// mongo database
config.mongo = {};
config.mongo.db = 'portfolio';
config.mongo.uri = process.env.MONGOLAB_URI;