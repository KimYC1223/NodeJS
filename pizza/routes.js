module.exports = function (app) {
  let mysqlScript = require('./mysqlScript.js')

  app.set('view engine','ejs');
  app.get('/', (req,res) => {
    res.render(__dirname+'/HTML/index.ejs')
  })

  app.get('/signUp0', (req,res) => {
    res.render(__dirname+'/HTML/signUp0.ejs')
  })

  app.get('/signUp', (req,res) => {
    res.render(__dirname+'/HTML/signUp.ejs')
  })

  app.post('/signUp', (req,res) => {
    res.render(__dirname+'/HTML/signUp2.ejs')
  })

  app.get('/emailSend', (req,res) => {
    res.render(__dirname+'/HTML/mailSend.ejs')
  })

  app.get('/checkId/:id', (req,res) => {
    mysqlScript.checkId(req,res)
  })

  app.post('/mailSend', (req,res) => {
    mysqlScript.postEmail(req,res)
  })

  app.get('/mailConfirm', (req,res) => {
    mysqlScript.confirmEmail(req,res)
  })

  app.post('/loginProcess', (req,res) => {
    mysqlScript.loginProcess(req,res)
  })
}
