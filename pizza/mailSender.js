var nodemailer = require('nodemailer')
let createTransport = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : 'linkurzlinkus@gmail.com',
    pass : 'Shfurrhk dufwjd1!@'
  }
})

module.exports = (function() {
  return{
    confirmUser: (email,id,name,num,domain) => {
      let transporter = createTransport
      let mailOption = {
        from : 'linkurzlinkus@gmail.com',
        to : email,
        subject : 'ROBO PIZZA 회원가입 승인 메일',
        html : `<H1>회원가입 인증 메일</H1><hr>
                반갑습니다. ${name}님.<br><br>
                <span sytle="color:rgb(52, 173, 232)">ID : ${id}</span>의 이메일 인증 과정입니다.<br>
                본 이메일 인증은 링커즈 회원가입을 위한 필수 사항입니다.<br><br>
                아래 [이메일 인증하기] 버튼을 클릭한 후 <br><br>
                홈페이지에서 남은 회원 가입 절차를 완료하여 주시기 바랍니다.<br><br>
                <a href="${domain}/mailConfirm?id=${id}&num=${num}">
                <button style="width:250px;color:rgb(255, 255, 255);
                background-color:rgb(233, 81, 16);border-radius:7px;
                font-weight:bold";font-size:18px;>
                이메일 인증하기</button></a>
                `
      }
      transporter.sendMail(mailOption, (error,info) => {
        if (error) console.log(error)
        else console.log('Email Sent : ' + info.response)
      })
      return;
    },
    queryUser: function (req,res) {

        return;
    },
    queryPassword: function (req,res) {

        return;
    },
  }

})()
