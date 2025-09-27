// Make connection
var socket = io.connect('http://localhost:4000');
let clearTypingTimer = null; 
const TYPING_DISPLAY_DURATION = 2000;
// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
   
    // Variable to hold the timer ID
    
    clearTimeout(clearTypingTimer);
    // Set the duration for how long the message should stay visible (e.g., 2 seconds)
 
    clearTypingTimer = setTimeout(() => {

        feedback.innerHTML = '';
        clearTypingTimer =null;
    }, TYPING_DISPLAY_DURATION);



});
