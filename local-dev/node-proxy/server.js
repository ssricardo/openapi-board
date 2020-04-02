
let proxy = require('express-http-proxy');
let express = require('express');
let request = require('request');

let app = express();

// app.use('/api', function(req, res) {
//     req.pipe(request('localhost:8080/api/manager')).pipe(res);
// });

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

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

app.get('/view/:name', function(req, res) {
    res.send('<h1>Tcharam! </h1>' + req.params['name']);
});

app.use('/', proxy('localhost:4200/'))

app.listen(80);

console.log('Local server started!')