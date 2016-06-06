var q = require('q')
var _ = require('lodash')
var io = require('./../lib/socket')
var Room = require('../model/room')

var roomList = {}

module.exports = {
  create: create,
  join: join
}

function create (socket, nickname) {
  var code = getNewCode()
  var room = new Room(code)

  roomList[ code ] = room

  socket.join(room.channel)

  socket.join(room.channel)

  socket.emit('signin:enterLobby', {
    nickname: nickname,
    roomCode: room.code
  })

  io.to(room.channel).emit('lobby:chat', {
    message: nickname + ' has joined'
  })
}

function join (socket, nickname, code) {
  var room = getExisting(code)

  if (!room) {
    socket.emit('signin:error', {
      message: 'Room Does Not Exist'
    })
  } else {
    socket.join(room.channel)
    socket.emit('signin:enterLobby', {
      nickname: nickname,
      roomCode: room.code
    })

    io.to(room.channel).emit('lobby:chat', {
      message: nickname + ' has joined'
    })
  }
}

function getExisting (code) {
  if (_.has(roomList, code)) {
    return roomList[ code ]
  } else {
    return null
  }
}

function getNewCode () {
  var code = _.sampleSize('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 4).join('')
  if (_.has(roomList, code)) {
    return getNewCode()
  } else {
    return code
  }
}
