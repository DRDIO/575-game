angular.module('575-game')
  .component('app', {
    templateUrl: 'app.template.html',
    $routeConfig: [
      { path: '/signin', name: 'Sign In', component: 'signin', useAsDefault: true }
    ]
  })
