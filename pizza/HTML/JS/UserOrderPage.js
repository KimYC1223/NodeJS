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

var serverURL = 'localhost:15001';
let socket = io.connect(serverURL);


$('#sendingBtn').click(function() {
  socket.emit('buttonClick', { name : name, message : str });
  console.log('sending!',str);
});
