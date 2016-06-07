angular.module('575-pregame')
  .component('lobby', {
    templateUrl: 'app/pregame/lobby/lobby.template.html',
    controller: LobbyController,
    controllerAs: 'vm',
    bindings: { $router: '<' },
    $canActivate: rcActivate
  })

function LobbyController (Player) {
  var vm = this
  var _room = Player.getRoom()

  vm.getWaitCount = getWaitCount
  vm.isReady = isReady
  vm.$routerCanDeactivate = rcDeactivate

  listen()

  /* LISTENERS  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function listen () {
    vm.roomCode = _room.code
    vm.players = _room.players
  }

  /* VIEW ACTIONS * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function getWaitCount () {
    return Math.max(0, _room.minCount - _room.players.length)
  }

  function isReady() {
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
