angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('joinLife', {
    url: '/join',
    templateUrl: 'templates/joinLife.html',
    controller: 'joinLifeCtrl'
  })

  .state('start', {
    url: '/start',
    templateUrl: 'templates/start.html',
    controller: 'startCtrl'
  })

  .state('verifyOtp', {
    url: '/verify-otp',
    templateUrl: 'templates/verifyOtp.html',
    controller: 'verifyOtpCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});