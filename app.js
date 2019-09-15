var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var chatRouter = require('./routes/chatRoute');
var configRouter = require('./routes/chatConfigRoute');

var app = express();
app.set('port', 1111);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log(__dirname)
debugger;

app.use('/', chatRouter);
app.use('/config', configRouter);

app.listen(1111)


module.exports = app;
