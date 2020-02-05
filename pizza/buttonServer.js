module.exports = function () {
  let fs            = require('fs')
  let net           = require('net');
  //====================================================================================
  //  버튼 클릭 처리
  //====================================================================================
  let sockets = []
  let port = 15003

  let server = net.createServer(function(socket) {
    socket.on('data', function(msg) {
      console.log(`button Data : ${msg}`)

      sockets.forEach((item,i) => {
        item.write(msg.toString()+'\0')
      })
    })

    sockets.push(socket);
    console.log(`클라이언트 접속... 현재 클라이언트 수 : ${sockets.length}`)

    socket.on('end', function() {
        sockets.forEach((item,i) => {
          if (item == socket){
            sockets.splice(i,1)
          }
        })
        console.log(`클라이언트 접속 종료... 현재 클라이언트 수 : ${sockets.length}`)
    });

    socket.on('error', function() {
        sockets.forEach((item,i) => {
          if (item == socket){
            sockets.splice(i,1)
          }
        })
        console.log(`클라이언트 접속 종료... 현재 클라이언트 수 : ${sockets.length}`)
    });
  });

  server.on('listening', function() {
      console.log(`TCP 버튼 동작 서버 : ${port}`)
  });

  server.on('close', function() {
      console.log(`TCP 버튼 동작 서버 오프라인`);
  });

  server.listen(port);
}
