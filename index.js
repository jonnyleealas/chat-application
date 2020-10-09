'use strict';
//server 1
let express = require('express');
let socket = require('socket.io')

let app = express();
let server = app.listen(4000, ()=>{
  console.log('listening on request port 4000');
});

//static files this calls public mkdir and looks for all files it needs inside 2
app.use(express.static('public'));

//socket setup 3
//runs on server

let io = socket(server);

// listen for when connection is made 4
// next connect to html for front end
io.on('connection', (socket)=>{
 console.log('made socket connection',socket.id);
});
