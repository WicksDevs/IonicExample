angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('channel', {
      url: "/channel",
      templateUrl: "templates/main.html",
      controller: "ChannelController"
    })

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html"
    })

    .state('music', {
      url: '/music/:channelId',
      templateUrl: "templates/detail.html",
      controller: "ChannelDetailController"
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

