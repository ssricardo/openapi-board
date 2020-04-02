let express = require('express');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
    ws: true
});  //options
var http = require('http');

var app = express({
    ws: true
});

// http.createServer(function(req, res) {
//     proxy.web(req, res, { target: 'http://mytarget.com:8080' });
// }).listen(80);

app.get('/api/namespaces', function(req, res) {
    console.log('Endpoting namespace....');

    return res.json(['Production', 'Integration', 
    'feature/abc_123', 'feature/abc_124',
    'feature/abc_125', 'feature/abc_234']);
});

app.get('/api/nm/:namespace', function(req, res) {
    console.log('Namespace: ' + req.params['namespace']);

    appList = [{
        name: "Ricardo's App", 
        namespace: req.params['namespace'],
        version: "1.0-SNAPSHOT",
    }, {
        name: "Spring App", 
        namespace: req.params['namespace'],
        version: "4.0",
    }, {
        name: "Hibernate App", 
        namespace: req.params['namespace'],
        version: "5.6-SNAPSHOT",
    }, {
        name: "Python App", 
        namespace: req.params['namespace'],
        version: "0.1.3.5",
    }, {
        name: "Dummy App", 
        namespace: req.params['namespace'],
        version: "1.0",
    }, {
        name: "Dummy App", 
        namespace: req.params['namespace'],
        version: "1.0",
    }, {
        name: "Dummy App", 
        namespace: req.params['namespace'],
        version: "1.0",
    }, {
        name: "Dummy App", 
        namespace: req.params['namespace'],
        version: "1.0",
    }, {
        name: "Dummy App", 
        namespace: req.params['namespace'],
        version: "1.0",
    }, {
        name: "Dummy App", 
        namespace: req.params['namespace'],
        version: "1.0",
    }];

    return res.json(appList);
});

app.get('/api/app/:id', function(req, res) {
    return res.json({
        name: "Ricardo's App", 
        namespace: req.params['namespace'],
        urlAddress: "http://google.com",
        version: "1.0-SNAPSHOT",
        apiSpec: "{ \
            chave1: 'valor', \
            chave2: 'valor', \
            chave3: 'valor', \
            chave4: 'valor', \
            chave5: 'valor', \
            chave7: 'valor', \
         }"
    });
});

app.use('/', function(req, res) {
    return proxy.web(req, res, { target: 'http://localhost:4200' })
});

// app.use('/', function(req, res) {
//     request('http://localhost:4200/').pipe(res);
// });

app.listen(80);

// http.createServer(app, {
//     ws: true
// }).listen(80);

app.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
});

console.log('Local proxy server started on 80');