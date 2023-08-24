const socketIo = require("socket.io-client");
const fs = require("fs");

const socket = socketIo.connect("http://192.168.1.145:3000");

socket.on("connect", (log) => {
  console.log("Socket.IO client connected");
});

socket.on("connect_error", (error) => {
  console.error("Socket.IO connection error:", error);
});

socket.on("newLog", (log) => {
  console.log("Socket.IO log client connected");
  console.log("log :>> ", log);

  fs.appendFileSync("received_logs.log", log + "\n");
});
