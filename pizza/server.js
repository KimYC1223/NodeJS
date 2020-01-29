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
let dgram         = require('dgram')
let socket        = dgram.createSocket('udp4')
let sendingSocket = dgram.createSocket('udp4');

app.use(session({
 secret: 'PIZZA',
 resave: true,
 saveUninitialized: true
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); //


app.get('/sendingUDP', (req,res) => {
  let msg = new Buffer(req.param('str'));
  sendingSocket.send(msg, 0, msg.length, 15003, '127.0.0.1',
      function(err) {
          if ( err ) {
              console.log('UDP message send error', err);
              return;
          }
          console.log(`Msg \'${req.param('str')}\' Sending Complete... `);
      }
  );

  res.send(`Msg \'${req.param('str')}\' Sending Complete... `);
})



require('./routes.js')(app);

app.use(express.static(path.join(__dirname, './HTML')));

// Save our port
var port = process.env.PORT || 15000;
let portUDP = process.env.PORT || 15001;
socket.bind(portUDP)
socket.on('listening', () => { console.log('listening event : 15001') })
let frameCount = 0;
socket.on('message', (msg, rinfo) => {
  frameCount ++;
  console.log(frameCount);
  fs.writeFile(`${__dirname}/HTML/IMG/test.bmp`,msg,function(error){if(error)console.log(error)})
})
socket.on('close', () => { console.log('close event') })



// Start the server and listen on port
app.listen(port,function(){
  console.log("Live on port: " + port);
});
