'use strict'

class Player {
  constructor (nickname) {
    this.maxHand = 10
    this.nickname = nickname.toUpperCase().replace(/[^A-Z0-9 ]/g, '')
    this.emoji = '&#' + (Math.round((Math.random() * 79)) + 128512) + ';'
    this.hand = []
  }

  /* PUBLIC * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  getDisplayName () {
    return this.emoji + ' ' + toTitleCase(this.nickname)
  }
}

module.exports = Player

function toTitleCase (str) {
  return str.replace(/\w\S*/g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}