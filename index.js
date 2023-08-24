const express = require("express");
const net = require('net');
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

const logFilePath = path.join(__dirname, "public/morgan.log");

const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

app.use(morgan("combined", { stream: logStream }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/404", (req, res) => {
  res.send("Error");
});

app.use("/logs", express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Set up a TCP server to send logs to the receiver laptop
const client = new net.Socket();
client.connect(12345, 'RECEIVER_LAPTOP_IP', () => {
  console.log('Connected to receiver laptop');
});

// Send logs to the receiver
logStream.on('data', (data) => {
  client.write(data);
});
