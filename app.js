var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var RateLimit = require('express-rate-limit');
var helmet  =  require('helmet');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var teacherRouter = require('./routes/teacher');
var studentRouter = require('./routes/student');
var headRouter = require('./routes/head');
var mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/lms',{useNewUrlParser:true,useUnifiedTopology:true});


var app = express();
connection.then((db)=>{
  console.log("connected successfully");
},(err)=>{
  console.log(err);
});

var limiter = new RateLimit({
  windowMs: 15*60*1000,
  max:100,
  delayMs:20,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(limiter);
app.use(helmet());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/head', headRouter);

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
