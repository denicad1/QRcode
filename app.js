var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const qrcode=require('qrcode');
const {createCanvas,loadImage}=require('canvas');
const canvas=createCanvas(200,200);
const ctx=canvas.getContext('2d');
const qr=require('qr-image');


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
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'client/build','index.html')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.post('/code',(req,res,next)=>{
 
  qrcode.toDataURL(req.body,((err,url)=>{
   if (err) throw err;
   return url;
  })
  )
  // let code=qrcode.create('this is a test');
  // res.send(code);
  // qrcode.toCanvas(ctx,'this is a test',(err)=>{
  //   if (err) {
  //     throw err;
  //   }

  // })
//   try{           
//     const qrStream = new PassThrough();
//     const result = await QRCode.toFileStream(qrStream, "this is a test",
//                 {
//                     type: 'png',
//                     width: 200,
//                     errorCorrectionLevel: 'H'
//                 }
//             );

//     qrStream.pipe(res);
// } catch(err){
//     console.error('Failed to return content', err);
// }

let code = qr.image(new Date().toString(), { type: 'svg' });
  res.type('svg');
  code.pipe(res);
 
})
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
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
