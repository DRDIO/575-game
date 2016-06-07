angular.module('575-layout')
  .component('appHeader', {
    templateUrl: 'app/layout/header/header.template.html',
    controller: LayoutHeaderController,
    controllerAs: 'vm'
  })

function LayoutHeaderController (Player) {
  var vm = this

  vm.isInRoom = isInRoom

  /* VIEW ACTIONS * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function isInRoom () {
    return Player.isInRoom()
  }
}
