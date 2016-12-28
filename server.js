var express = require('express');
var app = express();

var port     = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var logger   = require('morgan');
var path = require('path');
var fs = require('fs');
var debug = require('debug')('express');

// DB connection
//var configDB = require('./config/database.js');
var mongoose = require('mongoose');
var configDB = {
  'url' : 'mongodb://localhost/test'
};
mongoose.connect(configDB.url); // connect to our database

//debug('Booting %s', 'AGC APP');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log',{flags: 'a'});

if (app.get('env') == 'production') {
  app.use(logger('combined', { /*skip: function(req, res) { return res.statusCode < 400 },*/ stream: accessLogStream }));
} else {
  app.use(logger('dev'));
}

// API

var apiBase = '/api/v1';

var expressJWT = require('express-jwt')
var secret = { secret: 'my secret' };
app.use(apiBase, expressJWT(secret).unless({ path: [ apiBase + '/sessions/create']}))

// API route handlers
var sessions = require('./app/js/api/sessions');
var consumers = require('./app/js/api/consumers');
var products = require('./app/js/api/products');
var producers = require('./app/js/api/producers');
var providers = require('./app/js/api/providers');
var contracts = require('./app/js/api/contracts');
var mediators = require('./app/js/api/mediators');
var mediatorConditions = require('./app/js/api/mediatorConditions');
var specifications = require('./app/js/api/specifications');
var positions = require('./app/js/api/positions');
var deliveries = require('./app/js/api/deliveries');
var payments = require('./app/js/api/payments');

// API routes
app.use(apiBase+'/sessions', sessions); // redirect API calls
app.use(apiBase+'/consumers', consumers); // redirect API calls
app.use(apiBase+'/products', products); // redirect API calls
app.use(apiBase+'/producers', producers); // redirect API calls
app.use(apiBase+'/providers', providers); // redirect API calls
app.use(apiBase+'/contracts', contracts); // redirect API calls
app.use(apiBase+'/mediators', mediators); // redirect API calls
app.use(apiBase+'/mediatorConditions', mediatorConditions); // redirect API calls
app.use(apiBase+'/specifications', specifications); // redirect API calls
app.use(apiBase+'/positions', positions); // redirect API calls
app.use(apiBase+'/deliveries', deliveries); // redirect API calls
app.use(apiBase+'/payments', payments); // redirect API calls

app.use('/', express.static(__dirname + '/dist')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts')); // redirect bootstrap fonts

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
}); // initial HTML file

app.listen(port);
console.info('Server listening on port: ' + port);
//debug('Server listening on port: ' + port);
