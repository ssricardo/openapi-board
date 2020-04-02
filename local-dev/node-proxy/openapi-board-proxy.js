const express = require('express');
const request = require('request');
const httpProxy = require('http-proxy');
const http = require('http');
const route = express.Router();

var proxy = httpProxy.createProxyServer({
    ws: true
});

var app = express({
    ws: true
});

app.get('/api/manager/:nm/:app', function(req, res) {
    console.log('getting app');
    req.pipe(request.get('http://localhost:8080/api/manager/describe')).pipe(res);

    // console.log(result);
    // console.log('---------------');

    // res.contentType('application/yaml');
    // res.send(result);
});

app.use('/api', function(req, res) {
    console.log('API: ' + req.url);    
    return proxy.web(req, res, { target: 'http://localhost:8080/api' })
});

app.use('/view', function(req, res) {
    console.log('view: ' + req.url)
    return proxy.web(req, res, { target: 'http://localhost:8090/api-docs' })
});

app.use('/', function(req, res) {
    console.log('Proxy Angular');
    return proxy.web(req, res, { target: 'http://localhost:4200' })
});

proxy.on('error', function(e) {
    console.error('Error cought: ');
    console.error(e);
});

app.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
});

app.listen(80);

console.log('Local server started!');