var mysql      = require('mysql')
var mailSender = require('./mailSender.js')
let queryString = require('querystring')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'zerostone1!',
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
        let id = req.body.id2
        let pw = req.body.pw
        let name = req.body.name
        let sex = req.body.sex
        let birth = req.body.birth
        let tel = req.body.phone
        let email = req.body.email
        let account =  req.body.account

        let rand = Math.floor(Math.random() * 100000) + 1
        queryString = 'INSERT INTO user (no,id,pw,name,sex,birth,address,email,confirm,account)'
              + `VALUES (${rand},"${id}","${pw}","${name}","${sex}","${birth}",null,"${email}",0,"${account}");`

        connection.query(queryString, function(error,rows, fields) {
          if(error) {console.log(error); return;}
          mailSender.confirmUser(email,id,name,rand,'localhost:15000')
          res.render(__dirname+'/HTML/mailSend.ejs')
        });

        return;
    },
    confirmEmail: function (req,res) {
        let id = req.query.id
        let num = req.query.num

        connection.query(`SELECT * FROM user WHERE id = '${id}';`, function(error,rows, fields) {
          try{
            let queryNum = rows[0].no
            if (queryNum == num) {
              connection.query(`UPDATE user SET confirm = 1 WHERE id ='${id}';`, function(error2,rows2,fields2) {
                res.render(__dirname+'/HTML/signUp3.ejs')
              })
            } else {
              res.render(__dirname+'/HTML/mailSend.ejs')
            }
          } catch (e) {
            res.render(__dirname+'/HTML/mailSend.ejs')
          }
          return;
        }
      )
    },loginProcess: function (req,res) {
        let id = req.body.id
        let pw = req.body.pw


        queryString = 'select INTO user (no,id,pw,name,sex,birth,address,email,confirm,account)'
              + `VALUES (${rand},"${id}","${pw}","${name}","${sex}","${birth}",null,"${email}",0,"${account}");`

        connection.query(queryString, function(error,rows, fields) {
          if(error) {console.log(error); return;}
          mailSender.confirmUser(email,id,name,rand,'yjserver@yjremote.iptime.org:15000')
          res.render(__dirname+'/HTML/mailSend.ejs')
        });

        return;
    }
  }
})()
