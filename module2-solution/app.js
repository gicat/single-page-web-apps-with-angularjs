(function() {
    'use strict';

    var myApp = angular.module('ShoppingListCheckOff', []);

    myApp.controller('ToBuyController', ToBuyController);
    myApp.controller('AlreadyBoughtController', AlreadyBoughtController);
    myApp.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyController = this;
        toBuyController.items = ShoppingListCheckOffService.getToBuyItems();

        toBuyController.addAlreadyBoughtItem = function(item, index) {
            ShoppingListCheckOffService.addAlreadyBoughtItem(item);
            ShoppingListCheckOffService.removeToBuyItem(index);
        };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBoughtController = this;
        alreadyBoughtController.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }

    function ShoppingListCheckOffService () {
        var service = this;

        // List of to buy items
        var toBuyItems = [{
            name: "cookies",
            quantity: 10
        }, {
            name: "tomatoes",
            quantity: 30
        }, {
            name: "beer",
            quantity: 5
        }, {
            name: "chips",
            quantity: 4
        }, {
            name: "mineral water",
            quantity: 2
        }];
        var alreadyBoughtItems = [];

        service.addToBuyItems = function(toBuyItemsOuter) {
            toBuyItems = toBuyItemsOuter;
        };

        service.addAlreadyBoughtItem = function(itemOuter) {
            var item = {
                name: itemOuter.name,
                quantity: itemOuter.quantity
            };
            alreadyBoughtItems.push(item);
        };

        service.removeToBuyItem = function(index) {
            toBuyItems.splice(index, 1);
        }

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getAlreadyBoughtItems = function() {
            return alreadyBoughtItems;
        };
    }

})();