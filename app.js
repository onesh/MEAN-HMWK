var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var JSONreader = require('./readJSON');
var mongoConnector = require('./mongoHelper');
var index = require('./routes/index');
const util = require('util');
var url = require('url');

function generateData () {
  var data = JSONreader.readData();
    mongoConnector.insertData = mongoConnector.insertData.bind(null, data);
    mongoConnector.connect();
};

generateData();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.get('/data',function (req, res) {
  if (req) {
      console.log('req==>>', req.query);
      var promise = mongoConnector.find(req.query.email);
      promise.then((data)=> {
        console.log('Data found==>>', data);
        res.end(JSON.stringify(data));
      }).catch((err)=>{
        console.log(err);
        res.end('No Dataset Found Matching', req.query.email);
      })
}


});

app.listen('8080', function(){
	console.log('Server running on port 8080');
});

module.exports = app;
