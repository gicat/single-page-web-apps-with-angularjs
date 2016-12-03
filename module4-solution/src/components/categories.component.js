(function() {
    'use strict';

    angular.module('Data')
        .component('categoriesList', {
            templateUrl: 'src/views/categories.view.html',
            bindings: {
                items: '<'
            }
        });

})();