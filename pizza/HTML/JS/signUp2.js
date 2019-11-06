let idCheckbox = document.getElementsByName('IDCheck')
let inputID = document.getElementsByName('id')
let inputPW = document.getElementsByName('pw')
let inputPW2 = document.getElementsByName('pw2')
let inputEmail = document.getElementsByName('email')
let inputBirth = document.getElementsByName('birth')
let inputPhone = document.getElementsByName('phone')
let inputName = document.getElementsByName('name')
let inputAccount = document.getElementsByName('account')

//idCheckBtn.onclick = () => {
//  fetch("/idcheck").then( (data) => {
//    alert(data);
//  });
//};

let nextBtn = () => {
  if (!idCheckbox[0].checked) {
    alert('ID 중복 체크를 해 주세요!')
    inputID[0].focus()
    return
  }
  if (inputPW[0].value.length == 0) {
    alert('패스워드를 입력하세요!')
    inputPW[0].value='';
    inputPW2[0].value='';
    inputPW[0].focus();
    return;
  }

  if(inputPW[0].value != inputPW2[0].value ){
    alert('패스워드 입력과 확인이 다릅니다!')
    inputPW[0].value='';
    inputPW2[0].value='';
    inputPW[0].focus();
    return;
  }

  if (inputEmail[0].value.length == 0) {
    alert('이메일을 입력하세요!')
    inputEmail[0].focus();
    return;
  }

  let str = inputEmail[0].value.split('@')
  if (str.length != 2 || str[0].length == 0 || str[1].length == 0){
    alert('Email 형식이 올바르지 않습니다.')
    inputEmail[0].focus();
    return;
  }

  if (inputBirth[0].value.length == 0) {
    alert('생일을 입력하세요!')
    inputBirth[0].focus();
    return;
  }

  if (inputName[0].value.length == 0) {
    alert('이름을 입력하세요!')
    inputName[0].focus();
    return;
  }

  if ( inputBirth[0].value.split('-').length != 3 ){
    alert('날짜 형식이 올바르지 않습니다.')
    inputBirth[0].focus();
    return;
  } else {

    try {
      let currentYear = new Date().getFullYear()
      let offset = Number(inputBirth[0].value.split('-')[0])
                                          - currentYear;
      if ( offset > 120 & offset < 0 ) {
        alert('날짜 형식이 올바르지 않습니다.')
        inputBirth[0].focus();
        return;
      }

      offset = Number(inputBirth[0].value.split('-')[1])
      if (offset < 1 && offset > 12) {
        alert('날짜 형식이 올바르지 않습니다.')
        inputBirth[0].focus();
        return;
      }

      let month = [31,29,31,30,31,30,31,31,30,31,30,31];
      let max = month[offset]
      offset = Number(inputBirth[0].value.split('-')[2])
      if (offset < 1 && offset > max) {
        alert('날짜 형식이 올바르지 않습니다.')
        inputBirth[0].focus();
        return;
      }
    } catch(Error) {
      alert('날짜 형식이 올바르지 않습니다.')
      inputBirth[0].focus();
      return;
    }
  }

  if (inputPhone[0].value.length != 11){
    alert('번호 형식이 올바르지 않습니다.')
    inputPhone[0].focus();
    return;
  }

  str = inputAccount[0].value.split('@')
  if (str.length != 2 || str[0].length == 0 || str[1].length == 0){
    alert('카카오 계좌 형식이 올바르지 않습니다.')
    inputEmail[0].focus();
    return;
  }

  let myForm = document.getElementById('userForm').submit()
}
