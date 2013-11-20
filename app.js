
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

var states = sequelize.define('States', {
    Region: Sequelize.STRING(30),
    Population: Sequelize.INTEGER(11),
    pop_dens: Sequelize.FLOAT,
    math_4th_basic: Sequelize.INTEGER(11),
    math_4th_proficient: Sequelize.INTEGER(11),
    math_8th_basic: Sequelize.INTEGER(11),
    math_8th_proficient: Sequelize.INTEGER(11),
    reading_4th_basic: Sequelize.INTEGER(11),
    reading_4th_proficient: Sequelize.INTEGER(11),
    reading_8th_basic: Sequelize.INTEGER(11),
    reading_8th_proficient: Sequelize.INTEGER(11),
    FY_2011: Sequelize.INTEGER(11),
    FY_2010: Sequelize.INTEGER(11),
    Change_2010_2011: Sequelize.FLOAT,
    perc_change: Sequelize.FLOAT,
    num_teachers_thous: Sequelize.FLOAT,
    teacher_perc_less_bach: Sequelize.FLOAT,
    teacher_perc_bach: Sequelize.FLOAT,
    teacher_perc_mast: Sequelize.FLOAT,
    teacher_perc_edspecialist_or_doc: Sequelize.FLOAT,
    teach_less_than_3: Sequelize.FLOAT,
    teach_3_to_9: Sequelize.FLOAT,
    teach_10_to_20: Sequelize.FLOAT,
    teach_over_20: Sequelize.FLOAT,
    class_size_elem: Sequelize.FLOAT,
    class_size_sec: Sequelize.FLOAT,
    num_teachers_in_thous: Sequelize.FLOAT,
    num_teachers_elem: Sequelize.FLOAT,
    num_teachers_sec: Sequelize.FLOAT,
    av_sal_thous: Sequelize.FLOAT,
    av_sal_elem: Sequelize.FLOAT,
    av_sal_sec: Sequelize.FLOAT,
    enrollment_perc_k12_08: Sequelize.FLOAT,
    hours_day_k12_08: Sequelize.FLOAT,
    enrollment_perc_k12_12: Sequelize.FLOAT,
    hours_day_k12_12: Sequelize.FLOAT,
    days_year_k12_12: Sequelize.INTEGER(11),
    hours_year_k12_12: Sequelize.INTEGER(11),
    enrollment_perc_elem_12: Sequelize.FLOAT,
    hours_day_elem_12: Sequelize.FLOAT,
    enrollment_perc_sec_12: Sequelize.FLOAT,
    hours_day_sec_12: Sequelize.FLOAT,
    completion_percent: Sequelize.FLOAT,
    comp_perc_disabilities: Sequelize.FLOAT,
    comp_perc_limited_english: Sequelize.FLOAT,
    comp_perc_econ_disadv: Sequelize.FLOAT,
    Perc_highschoolgrad_25_plus: Sequelize.FLOAT,
    perc_bach_degree_25_plus: Sequelize.FLOAT,
    Perc_Advanced_degree_25_plus: Sequelize.FLOAT,
});


app.use(express.bodyParser());

app.use(function(req,res,next){
	states.all().success(function(states) {
        res.locals.states = states;
    });
  next();
});

app.get('/states', function(req, res) {
    states.all().success(function(states) {
        res.send(states);
        console.log(states);
    });
});

try {
    sequelize.sync();
}
catch (err) {
    console.log("database problem: "+err);  
}

// var localStates = null;
// $.get('/states', function(data) {
// 	localstates = data;	
// });
// localstates = data;

// var col = $()

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/getData',function(req, res) {

	// for(var i =0; i < DataTemplate.statesData.length; i++){

	// }
	// res.send();

	res.render(index.ejs);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
