var express       = require('express')        // call express
var app           = express()                  // define our app using express
var bodyParser    = require('body-parser')
var http          = require('http')
var fs            = require('fs')
var path          = require('path')
var util          = require('util')
var os            = require('os')
var session       = require('express-session')
var mysql         = require('mysql')

app.use(session({
 secret: 'PIZZA',
 resave: true,
 saveUninitialized: true
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); //



require('./routes.js')(app);

app.use(express.static(path.join(__dirname, './HTML')));

// Save our port
var port = process.env.PORT || 30000;

// Start the server and listen on port
app.listen(port,function(){
  console.log("Live on port: " + port);
});
