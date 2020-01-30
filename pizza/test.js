var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
socket.bind(15001);

socket.on('listening', function() {
	    console.log('listening event');
});

var count = 0;
socket.on('message', function(msg, rinfo) {
	    count ++;
	    console.log('메세지 도착', rinfo.address, msg.toString(),count);
});

socket.on('close', function() {
	    console.log('close event');
});
