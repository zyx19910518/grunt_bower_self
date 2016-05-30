'use strict';

angular
.module('sbAdminApp', [
  'oc.lazyLoad',
  'ui.router',
  'ui.bootstrap',
  ])
.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

  $ocLazyLoadProvider.config({
    debug:false,
    events:true,
  });

  $urlRouterProvider.otherwise('/dashboard/home');

  $stateProvider
  .state('dashboard', {
    url:'/dashboard',
    templateUrl: 'views/dashboard/main.html',
    resolve: {
      loadMyDirectives:function($ocLazyLoad){
        return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:[
            'scripts/directives/header/header.js',
            'scripts/directives/header/header-notification/header-notification.js',
            'scripts/directives/sidebar/sidebar.js',
            'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
          ]
        })
      }
    }
  })
  .state('dashboard.home',{
    url:'/home',
    controller: 'MainCtrl',
    templateUrl:'views/dashboard/home.html',
    resolve: {
      loadMyFiles:function($ocLazyLoad) {
        return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:[
            'scripts/dashboard/home.js'
          ]
        })
      }
    }
  })
  .state('dashboard.blank',{
    templateUrl:'views/dashboard/blank.html',
    url:'/blank'
  })
}]);


