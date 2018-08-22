var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment');
var indexRouter = require('./routes/index');
var statisticsRoute =  require('./routes/statistics');
var managerRoute = require('./routes/manager');
var projstatRoute = require('./routes/projectstatistics');
var db = require('./db_seq/db_init')
var apitg = require('./api/tg_multi_seq')
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
apitg.call()
app.use('/index', indexRouter);
app.use('/statistics', statisticsRoute);
app.use('/manager', managerRoute);
app.use('/projectstatistics', projstatRoute);
app.use('/filter', function (req, res) {
    let dates = req.body.dates.split('-')
    managerRoute.setDate1(moment(dates[0], 'DD.MM.YYYY'))
    managerRoute.setDate2(moment(dates[1], 'DD.MM.YYYY'))
    res.redirect(req.headers.referer)
});
app.use('/download',async function (req, res) {
    let dates = req.body.dates.split('-')
    var sql_api = require('./db_seq/sql_seq_api');
    let tel = managerRoute.get_tel()
    let messdown = await sql_api.DownloadMessPersonForTime(tel,
        moment(dates[0], 'DD.MM.YYYY'), moment(dates[1], 'DD.MM.YYYY'))

    res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(messdown);
    //await res.download(encodeURI(messdown))
    //managerRoute.download('mess.csv',messdown)
    //managerRoute.download(messdown)
    //res.redirect(req.headers.referer)
    //res.redirect(req.headers.referer)
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
  //res.render('error');
});

module.exports = app;