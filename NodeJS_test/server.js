let dgram   = require('dgram')
let express = require('express')
let path    = require('path')
let socket  = dgram.createSocket('udp4')
let app     = express()
let fs      = require('fs')

require('./routes.js')(app)

let portExpress = process.env.PORT || 5000
let portUDP = process.env.PORT || 7777
socket.bind(portUDP)
socket.on('listening', () => { console.log('listening event') })
socket.on('message', (msg, rinfo) => {
  fs.writeFile(`${__dirname}/HTML/test.bmp`,msg,function(error){if(error)console.log(error)})
})
socket.on('close', () => { console.log('close event') })

app.use(express.static(path.join(__dirname,'./HTML')))

app.listen(portExpress, () => {console.log(`Server on port : ${portExpress}`)})
