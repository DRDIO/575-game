angular.module('575-network')
  .factory('Socket', Socket)

function Socket ($window, $rootScope, socketUrl) {
  var _socket = $window.io.connect(socketUrl)
  var _listeners = {}

  return {
    on: on,
    emit: emit
  }

  /* PUBLIC * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /**
   * @memberof Socket
   * @param eventName
   * @param callback
   */
  function on (eventName, callback) {
    if (_listeners[eventName]) {
      _socket.removeListener(eventName, _listeners[eventName])
    }

    _listeners[eventName] = function () {
      var args = arguments
      $rootScope.$apply(function () {
        callback.apply(_socket, args)
      })
    }

    _socket.on(eventName, _listeners[eventName])
  }

  /**
   * @memberof Socket
   * @param eventName
   * @param data
   * @param callback
   */
  function emit (eventName, data, callback) {
    _socket.emit(eventName, data, function () {
      var args = arguments
      $rootScope.$apply(function () {
        if (callback) {
          callback.apply(_socket, args)
        }
      })
    })
  }
}
