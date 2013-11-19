
/**
 * Module dependencies.
 */
var Sequelize = require('sequelize');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var DataTemplate = require('./DataTemplate.js');
var app = express();

var dbName = 'EducationData';
var dbUser = 'root';
var dbPass = null;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var sequelize = new Sequelize(dbName, dbUser, dbPass, {
	"host": "localhost"
});

var teachers = sequelize.define('teachers', {
    region: Sequelize.STRING(30),
    num_teachers_thous: Sequelize.FLOAT(11)
});


app.use(express.bodyParser());
app.get('/teachers', function(req, res) {
    Teachers.all().success(function(teachers) {
        res.send(teachers);
        console.log(teachers);
        console.log('got to the end');
    });
});

try {
    sequelize.sync();
}
catch (err) {
    console.log("database problem: "+err);  
}
















app.get('/', routes.index);
app.get('/users', user.list);
app.get('/getData',function(req, res) {

	for(var i =0; i < DataTemplate.statesData.length; i++){

	}
	res.send();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
