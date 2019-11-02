let nextBtn = () => {
  let check1 = document.getElementById('checkBox1')
  let check2 = document.getElementById('checkBox2')

  if (check1.checked == false) {
    alert('회원 가입 약관에 동의해 주세요')
    return
  }
  if (check2.checked == false) {
    alert('개인정보 처리방침 안내에 동의해 주세요.')
    return
  }

  let move = document.getElementById('hiddenForm')
  move.submit();
}
