angular.module('575-pregame')
  .component('signin', {
    templateUrl: 'pregame/signin/signin.template.html',
    controller: SigninController,
    controllerAs: 'vm'
  })

function SigninController (SharedState, Socket, Modal) {
  var vm = this
  var isProcessing = false

  vm.nickname = ''
  vm.roomCode = ''

  vm.formatNickname = formatNickname
  vm.formatRoomCode = formatRoomCode
  vm.isDisabled = isDisabled
  vm.start = start

  listen()

  function listen () {
    Socket.on('signin:enterLobby', function (data) {
      Modal.show('Room Created',
        'Congratulations, ' + data.nickname + '! Your room has been created. Share the following code with your ' +
        'friends so they can join you - <pre>' + data.roomCode + '</pre>', true)
    })

    Socket.on('signin:error', function (data) {
      Modal.show('Cannot Start Game', data.message, true)
    })
  }

  function formatNickname () {
    vm.nickname = vm.nickname.substr(0, 16)
  }

  function formatRoomCode () {
    vm.roomCode = vm.roomCode.replace(/[^A-Za-z0-9]/g, '').toUpperCase().substr(0, 4)
  }

  function isDisabled () {
    return !isProcessing && (!vm.nickname || (!SharedState.isActive('isNew') && !vm.roomCode))
  }

  function start () {
    isProcessing = true

    Socket.emit('game:start', {
      nickname: vm.nickname,
      roomCode: vm.roomCode
    })
  }
}
