// if NODE_ENV='global' or is not set, return production MongoDB uri
var config = module.exports = {};

config.env = 'production';
config.hostname = 'mlab.com';

// mongo database
config.mongo = {};
config.mongo.db = 'portfolio';
config.mongo.uri = process.env.MONGOLAB_URI;