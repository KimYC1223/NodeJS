let img = document.getElementById('img')
let count = 1

setInterval(() => {
  img.src = `./IMG/test.bmp?time=${count}`
  count++
},2000)
