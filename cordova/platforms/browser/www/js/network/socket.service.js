angular.module('575-network')
  .factory('Socket', Socket)

function Socket ($window, $rootScope) {
  var socket = $window.io.connect('localhost:3080')
  var listeners = {}

  return {
    on: on,
    emit: emit
  }

  /* IMPLEMENT  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /**
   * @memberof Socket
   * @param eventName
   * @param callback
   */
  function on (eventName, callback) {
    if (listeners[eventName]) {
      socket.removeListener(eventName, listeners[eventName])
    }

    listeners[eventName] = function () {
      var args = arguments;
      $rootScope.$apply(function () {
        callback.apply(socket, args)
      })
    }

    socket.on(eventName, listeners[eventName])
  }

  /**
   * @memberof Socket
   * @param eventName
   * @param data
   * @param callback
   */
  function emit (eventName, data, callback) {
    socket.emit(eventName, data, function () {
      var args = arguments
      $rootScope.$apply(function () {
        if (callback) {
          callback.apply(socket, args)
        }
      })
    })
  }
}
