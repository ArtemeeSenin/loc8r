const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

require('./app_api/models/db');

const routes = require('./app_server/routes/index');
const routesApi = require('./app_api/routes/index');
//const usersRouter = require('./app_server/routes/users');

const app = express();

/* set globals */
global.appRoot = path.resolve(__dirname); // root of project
global.serverRoot = path.resolve(__dirname, 'app_server'); // root of server
global.apiRoot = path.resolve(__dirname, 'app_api'); // root of api

/* set locals */
app.locals.basedir = path.join(__dirname, 'app_server', 'views'); // basdeir for pug paths

/* view engine setup */
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', routesApi);
//app.use('/users', usersRouter);

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
