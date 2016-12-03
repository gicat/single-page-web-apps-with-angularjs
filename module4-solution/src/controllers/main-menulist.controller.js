(function() {
    'use strict';

    angular.module('Data')
        .controller('MainMenuListController', MainMenuListController);


    MainMenuListController.$inject = ['items'];

    function MainMenuListController(items) {
        var mainList = this;
        mainList.items = items;
    }

})();