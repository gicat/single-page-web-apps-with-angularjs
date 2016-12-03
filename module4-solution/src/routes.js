(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig)
    .config(['$qProvider', function ($qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
    }]);;

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
      .state('home', {
      url: '/',
      templateUrl: 'src/views/home.view.html'
    })

    // Premade list page
    .state('mainList', {
      url: '/mainList',
      templateUrl: 'src/views/main-categories.view.html',
      controller: 'MainMenuListController as mainList',
      resolve: {
        items: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories().then(function (response) {
            return response.data;
          });
        }]
      }
    })

    // Item detail
    .state('items', {
      url: '/items/{category}',
      templateUrl: 'src/views/main-items.view.html',
      controller: 'ItemsController as itemsCtrl',
      resolve: {
        items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.category).then(function (response) {
            return response.data.menu_items;
          });
        }]
      }
    });
  }

})();