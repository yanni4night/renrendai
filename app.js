/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var errorhandler = require('errorhandler');

// all environments
app.set('port', process.env.PORT || 3030);
app.set('views', path.join(__dirname, 'template'));
//app.use(express.favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(app.router);
app.use(serveStatic('.'));

if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler())
}

app.get('/', function(req, res, next) {
    return res.send('use .action');
});

//验证码
app.get('/image.jsp', function(req, res, next) {
    return res.redirect('/static/img/captcha.png');
});

app.get(/(.+)\.action$/, function(req, res) {
    var stub = RegExp.$1;
    return fs.readFile(path.join('template', stub + '.html'), {
        encoding: 'utf-8'
    }, function(err, content) {
        if (err) {
            return res.send(404);
        }
        return res.send(content);
    });
})

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});