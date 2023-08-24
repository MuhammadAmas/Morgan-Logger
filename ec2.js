const socketIo = require('socket.io-client');
const fs = require('fs');

// Connect to the Socket.IO server running on Machine A
const socket = socketIo.connect('http://192.168.1.145:3000'); // Replace with Machine A's IP

// Listen for 'newLog' event
socket.on('newLog', (log) => {
  // Log received data to a local file or process it as needed
  fs.appendFileSync('received_logs.log', log + '\n');
});
