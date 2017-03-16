// modules =======================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');

// configuration =================================================
var db = require('./config'); // get production or test database
 
var port = process.env.PORT || 8080; // set port
mongoose.connect(db.mongo.uri); // connect to mongoDB database

// parse all data of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(express.static(__dirname + '/public')); // set the static files location

app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// routes =========================================================
app.use(require('./app/controllers'));

// start app =====================================================
app.listen(port);
console.log('Server listening on port ' + port);

exports = module.exports = app; // expose app
