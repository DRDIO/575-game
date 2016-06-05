var io = require('./lib/socket.js')
var RoomCtrl = require('./controller/room')

io.on('connection', (socket) => {
  socket.on('game:start', (data) => {
    if (data.room) {
      RoomCtrl.join(socket, data.nickname, data.roomCode)
    } else {
      RoomCtrl.create(socket, data.nickname)
    }
  })

  socket.on('game:leave', (data) => {
    console.log('quit')
    socket.emit('game:disconnect', () => {
      console.log('discconnect')
    })
  })
})
