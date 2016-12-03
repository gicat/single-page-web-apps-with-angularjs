(function() {
    'use strict';

    angular.module('Data')
        .component('itemsList', {
            templateUrl: 'src/views/items.view.html',
            bindings: {
                items: '<'
            }
        });

})();