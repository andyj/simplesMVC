
// We include the native fs module so we can dynamically read in our controllers in /controllers/
var express = require('express'), 
  config = require('./config')(),
  http = require('http'), 
  path = require('path'), 
  fs = require('fs');
 var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.engine('html', require('hogan-express'));
  app.set('view engine', 'html'); // use .html extension for templates
  app.set('layout', 'layouts/default'); // use layouts/default.html as the default layout
  // Put the config settings where we can access them in the routes
  app.set('config', config); 
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  // The following 2 live replace app.use(express.bodyParser());
  app.use(express.json());
  app.use(express.urlencoded());

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Here we read in all js files from the /controllers/ directory. 
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});


http.createServer(app).listen( config.port, function(){
  console.log("Express server running " + config.mode +" on port " + config.port);
});



