const express = require('express')
const morgan = require('morgan')
const http = require('http')
const socketIo = require('socket.io')
const fs = require('fs')
const path = require('path')
const Tail = require('tail').Tail;

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const logFilePath = path.join(__dirname, 'public/morgan.log')

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' })

console.log(logFilePath);

app.use(morgan('combined', { stream: logStream }))



io.on('connection', (socket) => {
  console.log('Socket.IO client connected')
})

io.on('error', (err) => {
  console.error('Socket.IO error:', err)
})


// app.use((req, res, next) => {
//   io.emit('newLog', temp)
//   next()
// })

const tail = new Tail(logFilePath);

tail.on('line', (data) => {
  io.emit('newLog', data);
});


app.use("/logs", express.static("public"))

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Logging server is running on port ${PORT}`)
})
