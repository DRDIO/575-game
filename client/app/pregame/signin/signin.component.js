angular.module('575-pregame')
  .component('signin', {
    templateUrl: 'app/pregame/signin/signin.template.html',
    controller: SigninController,
    controllerAs: 'vm',
    bindings: { $router: '<' }
  })

/**
 *
 * @param SharedState
 * @param Socket
 * @param Modal
 * @param Player
 * @constructor
 */
function SigninController (SharedState, Socket, Modal, Player) {
  var vm = this
  var _isProcessing = false

  vm.nickname = ''
  vm.roomCode = ''

  vm.formatNickname = formatNickname
  vm.formatRoomCode = formatRoomCode
  vm.isDisabled = isDisabled
  vm.start = start
  vm.$routerCanDeactivate = rcDeactivate

  listen()

  /* LISTENERS  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function listen () {
    Socket.on('signin:enterLobby', onEnterLobby)
    Socket.on('signin:error', onError)
  }

  function onEnterLobby (data) {
    Player.set(data.nickname, data.room)

    Modal.show('Room Created',
      'Congratulations, ' + data.nickname + '! Your room has been created. Share the following code with your ' +
      'friends so they can join you - <code>' + data.room.code + '</code>', true)

    goToLobby()
  }

  function onError (data) {
    Modal.show('Cannot Start Game', data.message, true)
  }

  /* VIEW ACTIONS * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function formatNickname () {
    vm.nickname = vm.nickname.substr(0, 16)
  }

  function formatRoomCode () {
    vm.roomCode = vm.roomCode.replace(/[^A-Za-z0-9]/g, '').toUpperCase().substr(0, 4)
  }

  function isDisabled () {
    return !_isProcessing && (!vm.nickname || (!SharedState.isActive('isNew') && !vm.roomCode))
  }

  function start () {
    _isProcessing = true

    Socket.emit('game:start', {
      nickname: vm.nickname,
      roomCode: vm.roomCode
    })
  }

  /* PRIVATE  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function rcDeactivate () {
    if (!Player.isInRoom()) {
      return false
    }
  }

  function goToLobby () {
    vm.$router.navigate([ 'Lobby', {
      nickname: Player.getNickname(),
      roomCode: Player.getRoom().code
    } ])
  }
}
