angular.module('575-layout')
  .component('appModal', {
    templateUrl: 'layout/modal/modal.template.html',
    controller: ModalController,
    controllerAs: 'vm'
  })

function ModalController (Modal, ngSanitize) {
  var vm = this
  vm.modal = Modal
}
