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
  // 'url' : 'mongodb://localhost/norma'
   // 'url' : 'mongodb://test:123@ds149489.mlab.com:49489/norma_db_main'
   "url" : "mongodb://test:123@ds151049.mlab.com:51049/heroku_0kr900sm"
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
// app.use(apiBase, expressJWT(secret).unless({ path: [ apiBase + '/sessions/create']}))

// API route handlers
var sessions = require('./src/js/api/sessions');
var groups = require('./src/js/api/groups');
var consumers = require('./src/js/api/consumers');
var countries = require('./src/js/api/countries');
var products = require('./src/js/api/products');
var producers = require('./src/js/api/producers');
var providers = require('./src/js/api/providers');
var contracts = require('./src/js/api/contracts');
var mediators = require('./src/js/api/mediators');
var mediatorConditions = require('./src/js/api/mediatorConditions');
var specifications = require('./src/js/api/specifications');
var positions = require('./src/js/api/positions');
var operationtypes = require('./src/js/api/operationTypes');
var mediatortypes = require('./src/js/api/mediatorTypes');
var units = require('./src/js/api/units');
var deliveries = require('./src/js/api/deliveries');
var payments = require('./src/js/api/payments');
var deliveryEvents = require('./src/js/api/deliveryEvents');
var paymentEvents = require('./src/js/api/paymentEvents');
var deliveryLetters = require('./src/js/api/deliveryLetters');
var applications = require('./src/js/api/applications');
var bills = require('./src/js/api/bills');
var billpositions = require('./src/js/api/billPositions');

// API routes
app.use(apiBase+'/sessions', sessions); // redirect API calls
app.use(apiBase+'/groups', groups); // redirect API calls
app.use(apiBase+'/consumers', consumers); // redirect API calls
app.use(apiBase+'/countries', countries); // redirect API calls
app.use(apiBase+'/products', products); // redirect API calls
app.use(apiBase+'/producers', producers); // redirect API calls
app.use(apiBase+'/providers', providers); // redirect API calls
app.use(apiBase+'/contracts', contracts); // redirect API calls
app.use(apiBase+'/mediators', mediators); // redirect API calls
app.use(apiBase+'/mediatorconditions', mediatorConditions); // redirect API calls
app.use(apiBase+'/specifications', specifications); // redirect API calls
app.use(apiBase+'/positions', positions); // redirect API calls
app.use(apiBase+'/operationtypes', operationtypes); // redirect API calls
app.use(apiBase+'/mediatortypes', mediatortypes); // redirect API calls
app.use(apiBase+'/units', units); // redirect API calls
app.use(apiBase+'/deliveries', deliveries); // redirect API calls
app.use(apiBase+'/payments', payments); // redirect API calls
app.use(apiBase+'/deliveryevents', deliveryEvents); // redirect API calls
app.use(apiBase+'/paymentevents', paymentEvents); // redirect API calls
app.use(apiBase+'/deliveryletters', deliveryLetters); // redirect API calls
app.use(apiBase+'/applications', applications); // redirect API calls
app.use(apiBase+'/bills', bills); // redirect API calls
app.use(apiBase+'/billpositions', billpositions); // redirect API calls

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
