angular.module('575-network')
  .factory('Player', Player)

/**
 * @returns {{set: Socket.set}}
 * @constructor
 */
function Player () {
  var _nickname = ''
  var _room = null

  return {
    set: set,
    getNickname: getNickname,
    getRoom: getRoom,
    isInRoom: isInRoom
  }

  /* PUBLIC * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /**
   * @memberof Player
   * @param nickname
   * @param room
   */
  function set (nickname, room) {
    _nickname = nickname
    _room = room
  }

  /**
   * @memberof Player
   * @returns {boolean}
   */
  function isInRoom () {
    return !!_room
  }

  /**
   * @memberof Player
   * @returns {string}
   */
  function getNickname () {
    return _nickname
  }

  /**
   * @memberof Player
   * @returns {*}
   */
  function getRoom () {
    return _room
  }
}
