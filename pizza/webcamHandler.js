module.exports = function (app) {
  var fs            = require('fs')
  let dgram         = require('dgram')
  let net           = require('net');
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

  let frameCount = 0;
  let flag = false;
  let frameSmallCount = 0;

  var server = net.createServer(function(socket) {
      // connection event
      console.log('클라이언트 접속');
      socket.on('data', function(msg) {
          fs.writeFile(`${__dirname}/HTML/IMG/test.jpeg`,msg,function(error){if(error)console.log(error)})
          console.log(`${msg.length}`);
      });
      socket.on('end', function() {console.log('클라이언트 접속 종료');});
  });
  server.on('listening', function() { console.log(`Server is listening... Port : ${webcamPort}`); });
  server.on('close', function() { console.log('Server closed');});
  server.listen(webcamPort);

  app.get('/checkFrame', (req,res) => {
    res.send(`${frame}`);
  })
}
