const socketIo = require("socket.io-client");

// Connect to the Socket.IO server running on Server A
const socket = socketIo.connect("http://192.168.1.145:3000"); // Replace with Server A's IP

// Listen for 'newLog' event
socket.on("newLog", (data) => {
  console.log("Received new log:", data);
  // You can save the received logs to a file or process them as needed
});
