module.exports = function (app) {
  var fs            = require('fs')
  let dgram         = require('dgram')
  let net           = require('net');
  let socket        = dgram.createSocket('udp4')
  let sendingSocket = dgram.createSocket('udp4');
  //====================================================================================
  //  버튼 클릭 처리
  //====================================================================================
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
  //====================================================================================

  let bufferMaxLen = 10;
  let currentPos = 0;
  var webcamPort = process.env.PORT || 15002;
  let frame = 0;
  let frameMax = 9;

  let portUDP = process.env.PORT || 15001;
  socket.bind(portUDP)
  socket.on('listening', () => { console.log('listening event : 15001') })
  let frameCount = 0;
  let flag = false;
  let frameSmallCount = 0;
  socket.on('message', (msg, rinfo) => {
    if (flag == false) {
      if (msg.length != 1472){
        frameCount ++;
        frameSmallCount = 0;
        console.log(frameCount + `frame load Done... (${msg.length}) [${frameSmallCount}]`);
        fs.writeFile(`${__dirname}/HTML/IMG/test.jpeg`,msg,function(error){if(error)console.log(error)})
      } else {
        frameCount ++;
        frameSmallCount = 0;
        console.log(frameCount + `frame load Start... (${msg.length}) [${frameSmallCount}]`);
        fs.writeFile(`${__dirname}/HTML/IMG/test.jpeg`,msg,function(error){if(error)console.log(error)})
        flag = true;
      }
    } else {
      if (msg.length == 1472) {
        frameSmallCount++;
        console.log(frameCount + `frame loading... (1472) [${frameSmallCount}]`);
        fs.appendFile(`${__dirname}/HTML/IMG/test.jpeg`,msg,function(error){if(error)console.log(error)})
      } else {
        frameSmallCount++;
        console.log(frameCount + `frame load Done... (${msg.length}) [${frameSmallCount}]`);
        fs.appendFile(`${__dirname}/HTML/IMG/test.jpeg`,msg,function(error){if(error)console.log(error)})
        flag = false;
      }
    }

  })
  socket.on('close', () => { console.log('close event') })


  app.get('/checkFrame', (req,res) => {
    res.send(`${frame}`);
  })
}
