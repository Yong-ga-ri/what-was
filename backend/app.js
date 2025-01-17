const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
// var path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const pool = require('./config/mariadb.config')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRouter');
const openaiRouter = require('./routes/searchRouter');
const feedbackRouter = require('./routes/feedback');

const app = express();
const corsOptions = {
  origin: '*',
  // method: [
  //   'GET',
  //   'POST',
  // ],
  // allowedHeaders: [
  //   'Content-Type',
  // ]
}

app.set('pool', pool);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/ask', openaiRouter);
app.use('/api/feedback', feedbackRouter);

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
