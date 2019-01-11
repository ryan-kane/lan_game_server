
document.addEventListener('DOMContentLoaded', onLoad, false)

var user_id;
var sendButton;
var chatInput;
var loginWindow;
var loginWindowButton;
var connectButton;
var loginWindowInput;
var loginWindowColourSelect;
var chatBoxDisplay;
var chatInfo;

var socket = io('http://' + window.document.location.host);

socket.on('chat', (data) => {
    switch(data.r_code) {
        // response codes:
        // 0 message
        // 1 login required
        // 2 good login
        // 3 user disconnected

        case 0:
            // fill the message with the msgdata
            chatBoxDisplay.innerHTML += `<p id='${data.msg_id}' class='chatMessage' style='background-color:${data.colour}; opacity: 0.9;'>${data.user}: ${data.msg}<p>`;
            document.getElementById(data.msg_id).scrollIntoView(true);

            break;
        case 1:
            console.log("LOGIN REQUIRED");
            // need login
            request_username((name)=>{
                socket.emit('chat', {user_name: name, action: 1});
            });
            break;
        case 2:
            // good login         
            sendButton.classList.toggle("show", true);
            sendButton.classList.toggle("hidden", false);
            chatInput.disabled = false;
            loginWindow.classList.toggle("show", false);
            chatInfo.innerHTML = `<h2 style='background-color:${data.colour}; opacity: 0.9;'>${data.user}</h2>`;

            break;
        case 3:
            // user disconnected
            document.getElementById("chatBoxDisplay").innerHTML += "<p class='disconnectMessage'> " + data.user + ": Disconnected<p>";
            break;
        default:
            break;

    }
  
});

function request_username(callback){
    console.log("REQUESTING USERNAME");
    loginWindow.classList.toggle("show", true);
    connectButton.classList.toggle("hidden", true);
    connectButton.classList.toggle("show", false);
    loginWindowButton.addEventListener('click', ()=>{
        let user_name = loginWindowInput.value;
        let colour = loginWindowColourSelect.value;
        if(user_name && colour){
            callback(user_name, colour);
        }
    });
}

function handleKeyPress(e){
    if(e.keyCode === 13){
        handleSend();
    }
}

function handleConnect(){
    request_username((name, c)=>{
        socket.emit('chat', {
            user_name: name, 
            colour: c,
            action: 1
        });
    });
}

function handleSend(){
    input = document.getElementById("chatInput");
    messageToSend = input.value;
    if(messageToSend){
        input.value = "";
        sendObj = {};
        sendObj.action = 0;
        sendObj.msg = messageToSend;
        socket.emit('chat', sendObj);
    }
}

function onLoad(){
    sendButton = document.getElementById("sendButton");
    chatInput = document.getElementById("chatInput");
    loginWindow = document.getElementById("loginWindow");
    loginWindowButton = document.getElementById("loginWindowButton");
    connectButton = document.getElementById("connectButton");
    loginWindowInput = document.getElementById("loginWindowInput");
    chatBoxDisplay = document.getElementById("chatBoxDisplay")
    chatInfo = document.getElementById("chatInfo");
    loginWindowColourSelect = document.getElementById("loginWindowColourSelector");
    connectButton.addEventListener("click", handleConnect);
    sendButton.addEventListener("click", handleSend);            
    chatInput.addEventListener("keypress", handleKeyPress);
    
}