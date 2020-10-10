'use strict';
//server 1
let express = require('express');
let socket = require('socket.io');
let port = process.env.PORT || 4000;
let app = express();
let server = app.listen(port, ()=>{
  console.log(`listening on ${port}`);
});

//static files this calls public mkdir and looks for all files it needs inside 2
app.use(express.static('public'));

//socket setup 3
//runs on server

let io = socket(server);

// listen for when connection is made 4
// next connect to html for front end
io.on('connection', (socket)=>{
  console.log('made socket connection', socket.id);
  socket.on('chat', (data)=>{
    io.sockets.emit('chat', data);
  });
  //shows handle is typing
  socket.on('typing', (data)=>{
    socket.broadcast.emit('typing', data);
  });
});

