// const express = require("express");
// const morgan = require("morgan");
// const fs = require("fs");
// const path = require("path");
// require('dotenv').config();

// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();

// const server = http.createServer(app);
// const io = socketIo(server);

// const PORT = process.env.PORT;


// const logFilePath = path.join(__dirname, "public/morgan.log");

// const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

// app.use(morgan("combined", { stream: logStream }));

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/404", (req, res) => {
//   res.send("Error");
// });

// app.use("/logs", express.static("public"));

// io.on('connection', (socket) => {
//   console.log('Socket.IO client connected');
// });

// // Inside the part where you're writing logs using Morgan
// app.use((req, res, next) => {
//   // Emit the log to connected clients
//   io.emit('newLog', req.originalUrl); // You can customize the data you send
//   next();
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Define the path to the log file
const logFilePath = path.join(__dirname, 'public/morgan.log');

// Create a write stream to the log file
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Use Morgan with the custom log stream
app.use(morgan('combined', { stream: logStream }));

app.get("/404", (req, res) => {
  res.send("Error");
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Socket.IO client connected');
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Logging server is running on port ${PORT}`);
});
