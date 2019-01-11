
document.addEventListener('DOMContentLoaded', onLoad, false)

var socket = io('http://' + window.document.location.host);

socket.on('msg', (data) => {
  // fill the hellopara with the msg
  document.getElementById("HelloPara").innerHTML += "<p> " + data.msg + "<p>";
});

function onLoad(){
  document.getElementById("HelloButton").addEventListener("click", handleHello);
}

function handleHello(){
  socket.emit('msg', {msg: "hello"});
}
