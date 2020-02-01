let img = document.getElementById('webcamImg')
let count = 1

setInterval(() => {
  img.src = `./IMG/test.jpeg?time=${count}`
  count++
},1000)

let btn = document.getElementById('sendingBtn');
let checkboxs = document.getElementsByName('btn');
let logging = document.getElementById('logging');

let str = '00000'

let checkChange = (event) => {
  str = ''
  if (checkboxs[0] == event.target) {
    if (checkboxs[0].checked) str += '1'
    else str += '0'
  } else {
    if (checkboxs[0].checked) str += '1'
    else str += '0'
  }

  if (checkboxs[1] == event.target) {
    if (checkboxs[1].checked) str += '1'
    else str += '0'
  } else {
    if (checkboxs[1].checked) str += '1'
    else str += '0'
  }

  if (checkboxs[2] == event.target) {
    if (checkboxs[2].checked) str += '1'
    else str += '0'
  } else {
    if (checkboxs[2].checked) str += '1'
    else str += '0'
  }

  if (checkboxs[3] == event.target) {
    if (checkboxs[3].checked) str += '1'
    else str += '0'
  } else {
    if (checkboxs[3].checked) str += '1'
    else str += '0'
  }

  if (checkboxs[4] == event.target) {
    if (checkboxs[4].checked) str += '1'
    else str += '0'
  } else {
    if (checkboxs[4].checked) str += '1'
    else str += '0'
  }

  logging.innerHTML = "Button state = " + str;
  console.log(str)
}

checkboxs[0].addEventListener('change', checkChange)
checkboxs[1].addEventListener('change', checkChange)
checkboxs[2].addEventListener('change', checkChange)
checkboxs[3].addEventListener('change', checkChange)
checkboxs[4].addEventListener('change', checkChange)

btn.addEventListener('click', () => {
  let query = 'str=' + str;

  jQuery.ajax({
		type:'GET',						// POST 방식으로
		url: '/sendingUDP',		// saveVideo.php로 전송
		processData:false,					// 기본 설정
		contentType: false,					// 기본 설정
		data: query,							// FormData 전송
		success: function(msg) {			// 성공시
			logging.innerHTML = msg;	// 메세지 출력
		},error: function(msg) {			// 실패시
			logging.innerHTML = msg;	// 메세지 출력
		}
	});
})
