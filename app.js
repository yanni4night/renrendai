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

//验证码/image_https.jsp
app.get(/\/image(_https)?\.jsp$/, function(req, res, next) {
  return res.redirect('/static/img/captcha.png');
});

app.all('/getUnreadMailsCount.action',function(req,res){
  return res.json({"totalCount":0});
});
app.get('/about/about.action',function(req,res){
  var flag = req.param('flag');
  if(!flag){
    return res.redirect('/about/intro.action');
  }

  return fs.readFile('template/about/'+flag+'.html',{encoding:'utf-8'},function(err,content){
    if(err){
      return res.redirect('/about/intro.action');
    }
    res.send(content);
  });

});
app.get(/(.+)\.action$/i, function(req, res) {
  var stub = String(RegExp.$1);
  var file = path.join('template', stub + '.html');
  return fs.readFile(file, {
    encoding: 'utf-8'
  }, function(err, content) {
    return res.send(err ? file + ' Not Found' : content);
  });
})

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});