const app = require('express')()
const http = require('http').createServer(app)

const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('New connection executed', socket.id)
  
  socket.on('msg', (msg) => {
    console.log(msg)

    socket.broadcast.emit('msg', socket.id + ' connected');
  })
})

http.listen(3000, function() {
  console.log('Server is running')
})