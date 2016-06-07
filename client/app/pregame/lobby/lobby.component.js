angular.module('575-pregame')
  .component('lobby', {
    templateUrl: 'app/pregame/lobby/lobby.template.html',
    controller: PregameLobbyController,
    controllerAs: 'vm',
    bindings: { $router: '<' },
    $canActivate: rcActivate
  })

function PregameLobbyController (Socket, Player, Modal, clipboard) {
  var vm = this
  var _room = Player.getRoom()

  vm.getWaitCount = getWaitCount
  vm.isReady = isReady
  vm.copyRoomUrl = copyRoomUrl
  vm.$routerCanDeactivate = rcDeactivate

  listen()

  /* LISTENERS  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function listen () {
    vm.roomCode = _room.code
    vm.players = _room.players

    Socket.on('lobby:playerAdded', onPlayerAdded)
  }

  function onPlayerAdded (data) {
    _room = Player.updateRoom(data.room)
    vm.players = _room.players
  }

  /* VIEW ACTIONS * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function copyRoomUrl () {
    clipboard.copyText('https://nuutco-575-dev.herokuapp.com/#/signin/' + _room.code)
    Modal.show('Link Copied', 'A shareable link to the game has been copied to your clipboard!', true)
  }

  function getWaitCount () {
    return Math.max(0, _room.minCount - _room.players.length)
  }

  function isReady () {
    return getWaitCount() === 0
  }

  /* PRIVATE  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function rcDeactivate () {

  }
}

function rcActivate ($rootRouter, Player) {
  if (!Player.isInRoom()) {
    $rootRouter.navigate([ 'Signin' ])
    return false
  } else {
    return true
  }
}
