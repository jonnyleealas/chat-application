'use strict';
// Make connection with html script tag

let socket = io();
var $window = $(window);
// Query DOM
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let button = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');
// Emit event when clicking send
// this sends data to server thats listening
button.addEventListener('click', ()=>{
  sendMessage();
});

// The 'Enter' event handler
$window.keydown(function (event) {
  if (event.which === 13) {
    sendMessage();
  }
});

function sendMessage() {
  if (message.value === '') {
    return alert('Add Some text');

  }

  if (handle.value === '') {
    return alert('Add a handle');

  }
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';
}

message.addEventListener('keypress', ()=>{
  socket.emit('typing', handle.value);
});
// listen for events from server

socket.on('chat', (data)=>{
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>'+ data.handle +':</strong>'+ data.message + '</p>';

});

socket.on('typing', (data)=>{
  feedback.innerHTML = '<p><em>'+ data +' is typing a message...</em></p>';
});

$.get('/messages').then(chatHistory => {
  chatHistory.map(data => {
    output.innerHTML += '<p><strong>'+ data.handle +':</strong>'+ data.message + '</p>';
  });
});
