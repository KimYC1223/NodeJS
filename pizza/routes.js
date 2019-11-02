module.exports = function (app) {
  let fs = require('fs')

  app.set('view engine','ejs');
  app.get('/', (req,res) => {
    res.render(__dirname+'/HTML/index.ejs')
  })

  app.get('/signUp', (req,res) => {
    res.render(__dirname+'/HTML/signUp.ejs')
  })

  app.post('/signUp', (req,res) => {
    res.render(__dirname+'/HTML/signUp2.ejs')
  })

  app.get('/test', (req,res) => {
    res.render(__dirname+'/HTML/signUp2.ejs')
  })
}
