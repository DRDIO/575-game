var q = require('q')
var _ = require('lodash')
var io = require('./../lib/socket')
var Room = require('../model/room')

var roomList = {}

module.exports = {
  create: create,
  join: join
}

function create (socket, name) {
  var code = getNewCode()
  var room = new Room(code)

  roomList[ code ] = room

  socket.join(room.channel)

  socket.emit('game:wait', {
    room: room.code
  })

  io.to(room.channel).emit('chat', {
    message: name + ' has created ' + room.code
  })
}

function join (socket, name, code) {
  var room = getExisting(code)

  if (!room) {
    socket.emit('error', {
      message: 'Room Does Not Exist'
    })
  } else {
    socket.join(room.channel)
    io.to(room.channel).emit('chat', {
      message: name + ' has joined'
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
