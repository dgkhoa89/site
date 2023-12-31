var express = require('express');
var app = express();
var fortunes = require('./lib/fortunes')

//disbale x-powered-by
app.disable('x-powered-by')

// set up handlebars view engine
var handlebars = require('express3-handlebars')
 .create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
    // console.log('ip: '+req.ip);
    // console.log('cookies: '+ req.cookies);
    // console.log('params: '+req.params);
    // console.log('body: '+req.body);
    // console.log('route: '+req.route)
    // console.log('accepts: '+req.accepts );
    // console.log('protocol: '+req.protocol );
    // console.log('secure: '+req.secure);
    // console.log('accepted lang: '+req.acceptsLanguages );
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about', { fortune: fortunes.getFortune() });
});

//print headers
app.get('/headers', function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
   });

   
// custom 404 page
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500)
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.');
});