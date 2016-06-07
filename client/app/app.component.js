angular.module('575-game')
  .component('app', {
    templateUrl: 'app/app.template.html',
    $routeConfig: [
      { path: '/signin', name: 'Signin', component: 'signin', useAsDefault: true },
      { path: '/signin/:roomCode', name: 'SigninShare', component: 'signin' },
      { path: '/lobby/:roomCode', name: 'Lobby', component: 'lobby' }
    ]
  })
