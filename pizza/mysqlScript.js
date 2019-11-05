var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Linkurz1!',
  port     : 3306,
  database : 'pizzaMaker'
});

module.exports = (function() {
  return{
    checkId: function (req,res) {
      let id = req.params.id
      connection.connect();
      connection.query('SELECT * from user', function(rows, fields) {
        res.writeHead(200,{'ContentType':'text/html'})
        if (rows == null) res.write('null')
        else res.write(rows)
        res.end();
      });
      connection.end();
      return;
    }
  }

})()
