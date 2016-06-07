'use strict'

var _ = require('lodash')
var io = require('./../lib/socket')
var Room = require('../model/room')
var Player = require('../model/player')
var Deck = require('../model/deck')

var roomList = {}

module.exports = {
  create: create,
  join: join
}

function create (socket, nickname) {
  var code = getNewCode()
  var room = new Room(code)
  var player = new Player(nickname)
  var deck = new Deck()

  room.addPlayer(player)
  room.setDeck(deck)

  roomList[ code ] = room

  socket.join(room.channel)

  socket.emit('signin:enterLobby', {
    nickname: player.getDisplayName(),
    room: room.getLobbyInfo()
  })
}

function join (socket, nickname, code) {
  var room = getExisting(code)
  var player = new Player(nickname)

  if (!room) {
    socket.emit('signin:error', {
      message: 'Room Does Not Exist'
    })
  } else {
    room.addPlayer(player)

    socket.join(room.channel)

    socket.emit('signin:enterLobby', {
      nickname: player.getDisplayName(),
      room: room.getLobbyInfo()
    })

    io.to(room.channel).emit('lobby:playerAdded', {
      room: room.getLobbyInfo()
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
