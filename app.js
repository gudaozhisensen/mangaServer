var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var imagesRouter = require('./api/banner_images');
var infoRouter = require('./api/comic_info');
var comicDetailRouter = require('./api/comic_detail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials", "true"); 
  res.header('Access-Control-Allow-Origin', '*');
// 　　res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
　　res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,  X-Requested-With , yourHeaderFeild');
　　res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
　　　　next();
})
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/images', imagesRouter);
app.use('/api/comics', infoRouter);
// app.use('/api/hot', infoRouter);
app.use('/api/allChapter', comicDetailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
