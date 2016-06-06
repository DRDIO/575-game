angular.module('575-pregame')
  .component('signin', {
    templateUrl: 'pregame/signin/signin.template.html',
    controller: SigninController,
    controllerAs: 'vm'
  })

function SigninController (SharedState, Socket) {
  var vm = this
  var isProcessing = false

  vm.nickname = ''
  vm.roomCode = ''

  vm.isDisabled = isDisabled
  vm.start = start

  listen()

  function listen () {
    Socket.on('game:wait', function (data) {
      alert(data)
    })
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
