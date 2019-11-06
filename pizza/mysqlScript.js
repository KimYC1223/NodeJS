var mysql      = require('mysql')
let queryString = require('querystring')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Linkurz1!',
  port     : 3306,
  database : 'pizzaMaker'
});
connection.connect();
module.exports = (function() {
  return{
    checkId: function (req,res) {
      let id = req.params.id
      connection.query(`SELECT * FROM user WHERE id = '${id}';`, function(error,rows, fields) {
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        try{
          let str ='{\n'
          str += `\t"no" : ${rows[0].no},\n`
          str += `\t"id" : "${rows[0].id}",\n`
          str += `\t"name" : "${rows[0].name}",\n`
          str += `\t"confirm" : ${rows[0].confirm},\n`
          str += `\t"sex" : "${rows[0].sex}",\n`
          str += `\t"birth" : "${rows[0].birth}",\n`
          str += `\t"email" : "${rows[0].email}"\n}`
          res.write(str)
        } catch (e) {res.write('null')}
        res.end();
      });
      return;
    },
    postEmail: function (req,res) {
        let id = req.body.id
        let pw = req.body.pw
        let name = req.body.name
        let sex = req.body.sex
        let birth = req.body.birth
        let tel = req.body.phone
        let email = req.body.email
        let account =  req.body.account

        connection.connect();
        queryString = 'INSERT INTO user (no,id,pw,name,sex,birth,address,email,confirm,account)'
              + `VALUES (0,"${id}","${pw}","${name}","${sex}","${birth}",null,"${email}",0,"${account}");`

        connection.query(queryString, function(err,rows, fields) {
          res.render(__dirname+'/HTML/mailSend.ejs')
        });
        connection.end();
        return;
    }
  }

})()
