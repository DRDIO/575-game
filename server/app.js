var path = require('path')
var express = require('express')
var app = express()
var io = require('./lib/socket.js')
var GameCtrl = require('./controller/game')

app.use(express.static(path.join(__dirname, '../www')))

app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname, '../www/index.html'))
})

io.on('connection', (socket) => {
  socket.on('game:start', (data) => {
    if (data.roomCode) {
      GameCtrl.join(socket, data.nickname, data.roomCode)
    } else {
      GameCtrl.create(socket, data.nickname)
    }
  })

  socket.on('game:leave', () => {
    console.log('quit')
    socket.emit('game:disconnect', () => {
      console.log('discconnect')
    })
  })
})

var port = process.env.PORT || 8000
var server = app.listen(port, () => {
  console.log('Starting App ' + port)
})
io.attach(server)
