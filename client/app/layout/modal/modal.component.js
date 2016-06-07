angular.module('575-layout')
  .component('appModal', {
    templateUrl: 'app/layout/modal/modal.template.html',
    controller: ModalController,
    controllerAs: 'vm'
  })

function ModalController (Modal) {
  var vm = this
  vm.modal = Modal
}
