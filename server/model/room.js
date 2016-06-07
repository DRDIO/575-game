'use strict'
var _ = require('lodash')

class Room {
  constructor (code) {
    this.code = code
    this.channel = 'room:' + this.code
    this.players = []
    this.minCount = 2
    this.deck = null
  }

  /* PUBLIC * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  getLobbyInfo () {
    return {
      code: this.code,
      minCount: this.minCount,
      players: this.getPlayerList()
    }
  }

  addPlayer (player) {
    var match = _.find(this.players, { nickname: player.nickname })
    if (!match) {
      this.players.push(player)
      return player
    }

    return match
  }

  getPlayerList () {
    return _.map(this.players, (player) => {
      return player.getDisplayName()
    })
  }

  setDeck (deck) {
    this.deck = deck
  }
}

module.exports = Room
