module.exports = function (app) {
	var net_client = require('net');

	app.get('/sendBtnData', (req,res) => {
		let btnData = req.query.order;

		var client = getConnection();
		writeData(client, btnData);
		res.send(`Msg Sending Complete... [${btnData}]`)
		client.end();
	})

	function getConnection(){
	    //서버에 해당 포트로 접속
	    var client = "";
	    var recvData = [];
	    var local_port = "";

	    client = net_client.connect({port: 15003, host:'localhost'}, function() {
	        local_port = this.localPort;
	        this.setEncoding('utf8');
	    });

	    client.on('error', function(err) {
	        console.log('client Socket Error: '+ JSON.stringify(err));
	    });
	    return client;
	}

	function writeData(socket, data){
	  socket.write(data);
	}

}
