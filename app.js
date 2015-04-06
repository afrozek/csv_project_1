
/*--------DEPENDENCIES--------*/
/*--------DEPENDENCIES--------*/
var express = require('express');
var mongoose = require('mongoose');
var multer  = require('multer');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var schools = require('./routes/schools.js');

var app = express();

//mongo variables
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
mongoose.connect('mongodb://localhost/test');


/*--------MULTER UPLOADER--------*/
/*--------MULTER UPLOADER--------*/

//UPLOAD STATUS
var done=false;

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return "file";
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));


/*--------ALL ENVIRONMENTS--------*/
/*--------ALL ENVIRONMENTS--------*/
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*--------ROUTES--------*/
/*--------ROUTES--------*/
//form display
app.get('/', routes.index);
app.get('/users', user.list);

//school links
app.post('/upload',schools.upload);
//school details
app.get('/schools/:name', schools.findByName);

/*--------SERVER--------*/
/*--------SERVER--------*/
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
