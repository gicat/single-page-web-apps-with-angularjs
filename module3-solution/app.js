(function() {
    'use strict';

    var myApp = angular.module('NarrowItDownApp', []);
    myApp.controller('NarrowItDownController', NarrowItDownController);
    myApp.service('MenuSearchService', MenuSearchService);
    myApp.directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;

        list.noItemsInList = function() {
            return list.items.length === 0;
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var me = this;
        me.searchTerm = '';
        me.found = [];

        me.getMatchedMenuItems = function() {
            if(!me.searchTerm) {
                me.found = [];
                return;
            }
            var promise = MenuSearchService.getMatchedMenuItems(me.searchTerm);

            promise.then(function(response) {
                    var foundItems = response.data.menu_items;
                    var filteredItems = [];
                    foundItems.forEach(function(entry) {
                        if (entry.description.indexOf(me.searchTerm) !== -1) {
                            filteredItems.push(entry);
                        }
                    });
                    me.found = filteredItems;
                })
                .catch(function(error) {
                    console.log(error);
                });
        };
        me.removeItem = function(itemIndex) {
            me.found.splice(itemIndex, 1);
        };
    }

    MenuSearchService.$inject = ['$http'];

    function MenuSearchService($http) {
        var me = this;
        me.getMatchedMenuItems = function(searchTerm) {
            var response = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            });
            return response;
        };
    }
})();