var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const qrcode=require('qrcode');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client/public')));
app.use(express.static(path.join(__dirname,'./client/public','index.html')));

//post request for generating qr code
app.post('/code',(req,res,next)=>{
 
  qrcode.toDataURL(req.body.message,((err,url)=>{
   if (err) throw err;
   res.send(url);
  }))
})
//get request to respond with react page
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
