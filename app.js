/**
  * Copyright (C) 2014 yanni4night.com
  * app.js
  *
  * changelog
  * 2014-07-30[11:28:33]:authorized
  *
  * @author yanni4night@gmail.com
  * @version 0.1.0
  * @since 0.1.0
  */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var errorhandler = require('errorhandler');

var app = express();
// all environments
app.set('port', process.env.PORT || 3030);
app.set('views', path.join(__dirname, 'template'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(serveStatic('.'));

if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler())
}

app.get('/', function(req, res, next) {
    return res.redirect('index.action');
});

//验证码
app.get('/image.jsp', function(req, res, next) {
    return res.redirect('/static/img/captcha.png');
});

app.get(/(.+)\.action$/i, function(req, res) {
    var stub = String(RegExp.$1).toLowerCase();
    return fs.readFile(path.join('template', stub + '.html'), {
        encoding: 'utf-8'
    }, function(err, content) {
        return res.send(err?404:content);
    });
})

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});