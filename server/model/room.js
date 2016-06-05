module.exports = function Room (code) {
  var vm = this

  vm.code = code
  vm.channel = 'room:' + vm.code
  vm.userList = []
}
