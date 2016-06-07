angular.module('575-game')
  .component('app', {
    templateUrl: 'app/app.template.html',
    $routeConfig: [
      { path: '/signin', name: 'Signin', component: 'signin', useAsDefault: true },
      { path: '/lobby/:roomCode/:nickname', name: 'Lobby', component: 'lobby' }
    ]
  })
