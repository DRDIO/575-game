var _ = require('lodash')

module.exports = function Room (code) {
  var vm = this

  vm.code = code
  vm.channel = 'room:' + vm.code
  vm.players = []
  vm.minCount = 2

  vm.addPlayer = addPlayer

  /* PUBLIC * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  function addPlayer (nickname) {
    vm.players.push(nickname)
    vm.players = _.sortBy(_.uniq(vm.players))
  }
}
