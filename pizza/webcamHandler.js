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
  var server = net.createServer(function(socket) {
      // connection event
      console.log('클라이언트 접속');
      socket.on('data', function(chunk) {
	  var start = Date.now();
	  frame = (frame > frameMax) ? 0 : frame + 1;
          fs.writeFile(`${__dirname}/HTML/IMG/test_${frame}.jpeg`,chunk,function(error){if(error)console.log(error)})
	  var end = Date.now();
	  var timeSpending = end - start;
	  console.log(`Msg recieving! (test_${frame}.jpeg) ${timeSpending}`);
      });
      socket.on('end', function() {console.log('클라이언트 접속 종료');});
  });
  server.on('listening', function() { console.log(`Server is listening... Port : ${webcamPort}`); });
  server.on('close', function() { console.log('Server closed');});
  server.listen(webcamPort);
}
