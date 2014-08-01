/**
 * Copyright (C) 2014 yanni4night.com
 * app.js
 *
 * changelog
 * 2014-07-30[11:28:33]:authorized
 * 2014-08-01[10:18:26]:use swig
 *
 * @author yanni4night@gmail.com
 * @version 0.1.1
 * @since 0.1.0
 */

var express = require('express');
var swig = require('swig');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var errorhandler = require('errorhandler');

//handlebars
swig.setDefaults({
  varControls: ['<{', '}>'],
  cache: false,
  loader: swig.loaders.fs(__dirname + '/template')
});


var app = express();
// all environments
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('port', process.env.PORT || 3030);
app.set('views', path.join(__dirname, 'template'));
app.set('view cache', false);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(serveStatic('.'));
app.use(errorhandler())



app.get('/', function(req, res, next) {
  return res.redirect('index.action');
});

//验证码/image_https.jsp
app.get(/\/image(_https)?\.jsp$/, function(req, res, next) {
  return res.redirect('/static/img/captcha.png');
});

app.all('/getUnreadMailsCount.action', function(req, res) {
  return res.json({
    "totalCount": 0
  });
});
app.get('/about/about.action', function(req, res) {
  var flag = req.param('flag');
  if (!flag) {
    return res.redirect('/about/intro.action');
  }
  return res.render('about/' + flag, {});
});

app.get(/(.+)\.action$/i, function(req, res) {
  var stub = String(RegExp.$1).slice(1);
  return res.render(stub, {});
})

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});