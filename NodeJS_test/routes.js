module.exports = (app) => {
  app.get('/sync' , (req,res) => {
    res.render(`${__dirname}/HTML/webcamTest.ejs`)
  })
}
