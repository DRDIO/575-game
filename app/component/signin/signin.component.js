angular.module('575-signin', [])
  .component('signin', {
    templateUrl: 'component/signin/signin.template.html',
    controller: SigninController
  })

function SigninController (SharedState) {
  var vm = this
  vm.nickname = ''
  vm.roomCode = ''

  vm.isMissingInfo = isMissingInfo
  vm.start = start

  function isMissingInfo () {
    return !vm.nickname || (!SharedState.isActive('isNew') && !vm.roomCode)
  }

  function start () {

  }
}
