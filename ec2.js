const socketIo = require('socket.io-client');
const fs = require("fs");

const socket = socketIo.connect('http://172.18.0.1:3000'); 

socket.on('connect', (log) => {
  console.log('Socket.IO client connected');

  fs.appendFileSync('received_logs.log', log + '\n');

  socket.emit('messageFromClient', 'Hello, Server! This is the client.');
});

socket.on('newLog', (log) => {
  console.log('Socket.IO log client connected');
  console.log('log :>> ', log);

  fs.appendFileSync('received_logs.log', log + '\n');

  socket.emit('messageFromClient', 'Hello, Server! This is the client.');
});
