module.exports = function (app) {
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

  var webcamPort = process.env.PORT || 15002;
  var server = net.createServer(function(socket) {
      // connection event
      console.log('클라이언트 접속');
      socket.on('data', function(chunk) {
          fs.writeFile(`${__dirname}/HTML/IMG/test.jpeg`,msg,function(error){if(error)console.log(error)})
      });
      socket.on('end', function() {console.log('클라이언트 접속 종료');});
  });

  server.on('listening', function() { console.log('Server is listening... Port : '); });
  server.on('close', function() { console.log('Server closed');});

}
