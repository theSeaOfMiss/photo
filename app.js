var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var multer = require('multer');   // 增加处

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var photos = require('./routes/photos')   // 增加处

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('photos', __dirname + '/public/photos');    // 增加处

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(multer({ dest: 'tmp/'}).array('image'));    // 增加处

app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/upload', photos.form);    // 增加处
app.post('/upload', photos.submit(app.get('photos')));    // 增加处
app.get('/photo/:id/download', photos.download(app.get('photos')));   // 增加处
app.use('/', photos.list);    // 修改处
app.use('/users', usersRouter);

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
