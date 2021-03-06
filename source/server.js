// Default modules
var express = require('express');
var path = require('path');
var routes = require('./routes');
var app = express();

// Default configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, '../public/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(express.cookieParser('frontend'));
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));
app.locals.pretty = false;

// Development configuration
if ('development' === app.get('env')) {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.locals.pretty = true;
}

// Routes
app.get('/', routes['index']);
app.get('/index.html', routes['index']);

// Initialization
app.listen(app.get('port'), function() {
  console.log('Template is running on port ' + app.get('port'));
});
