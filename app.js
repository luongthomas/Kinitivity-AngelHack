
/*******************
* Setup middleware *
********************/

// Import express
var express = require('express');
var app = express();
var path = require('path');

// Import connect for blur effect and nib
// var connect = require('connect')
//   , stylus = require('stylus')
//   , nib = require('nib');


// Import body-parser / setup (middleware for parsing POST content)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import and set up handlebars
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        // This helper allows us to use sections in templates
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});


// Import express-session and set the secret
var session = require('express-session');
app.use(session({secret:'IWillNeverTell'}));


// Tell express our default rendering engine and extensions
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set port and public folder for static content
app.set('port', process.env.PORT || 3000); // defaults to 3000 if env.port not set
app.use(express.static(__dirname + '/public')); // tells express where to go for public static content like css, js, imgs, etc


/*******************
* ROUTES:          *
********************/

// Main index page
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/select', function(req,res){
    res.sendFile(path.join(__dirname + '/select.html'));
});

// Counter test page
app.get('/count', function(req,res){
    var context = {};
    context.count = req.session.count || 0;
    req.session.count = context.count + 1;
    res.render('count', context);
});

// Hello World
app.get('/first', function(req,res){
    var context = {};
    res.render('index', context);
});

// Redirect
app.get('/submit', function(req,res){
    res.sendFile(path.join(__dirname + '/submit.html'));
});

app.get('/html', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


// Error Pages 404 (Not found) & 500 (Error)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

/******************
* Start Server    *
******************/

app.listen(app.get('port'), function(){
  console.log('Express started on localhost' + 
              app.get('port') + 
              '; press Ctrl-C to terminate.' );
});