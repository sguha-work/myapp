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

  .state('editProfile', {
    url: '/edit-profile',
    templateUrl: 'templates/editProfile.html',
    controller: 'editProfileCtrl'
  })

  .state('image', {
    url: '/image',
    templateUrl: 'templates/image.html',
    controller: 'imageCtrl'
  })

  .state('reaction', {
    url: '/reaction',
    templateUrl: 'templates/reaction.html',
    controller: 'reactionCtrl'
  })

  .state('changePassword', {
    url: '/change-password',
    templateUrl: 'templates/changePassword.html',
    controller: 'changePasswordCtrl'
  })

  .state('loading', {
    url: '/loading',
    templateUrl: 'templates/loading.html',
    controller: 'loadingCtrl'
  })

  .state('friends', {
    url: '/friends',
    templateUrl: 'templates/friends.html',
    controller: 'friendsCtrl'
  })

  .state('chat', {
    url: '/chat',
    templateUrl: 'templates/chat.html',
    controller: 'chatCtrl'
  })

  .state('chatList', {
    url: '/chat-list',
    templateUrl: 'templates/chatList.html',
    controller: 'chatListCtrl'
  })

  .state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })

  .state('pageList', {
    url: '/page-list',
    templateUrl: 'templates/pageList.html',
    controller: 'pageListCtrl'
  })

  .state('updateStatus', {
    url: '/update-status',
    templateUrl: 'templates/updateStatus.html',
    controller: 'updateStatusCtrl'
  })

  .state('addImage', {
    url: '/add-image',
    templateUrl: 'templates/addImage.html',
    controller: 'addImageCtrl'
  })

$urlRouterProvider.otherwise('/page-list')

  

});