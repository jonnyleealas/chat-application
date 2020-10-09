'use strict';
// Make connection with html script tag

let socket = io.connect('http://localhost:4000');

// Query DOM
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let button = document.getElementById('send');
let output = document.getElementById('output');

// Emit event when clicking send
// this sends data to server thats listening
button.addEventListener('click', ()=>{
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

// listen for events from server

socket.on('chat', (data)=>{
  output.innerHTML += '<p><strong>'+ data.handle +':</strong>'+ data.message + '</p>';
});
