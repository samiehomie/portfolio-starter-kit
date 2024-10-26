const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors()) // CORS 설정 추가

const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: '*', // 모든 도메인 허용
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('message', (data) => {
    io.emit('message', data)
  })

  socket.on('start', () => {
    io.emit('start')
  })

  socket.on('stop', () => {
    io.emit('stop')
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(4000, () => console.log('Listening on port 4000'))
