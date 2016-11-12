(function() {
    'use strict';

    var myApp = angular.module('LunchCheck', []);

    myApp.controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.dishes = "";
        $scope.message = "";

        $scope.checkIfTooMuch = function() {
            if ($scope.dishes === "") {
                $scope.message = "Please enter data first";
                return;
            }
            var splittedValues = $scope.dishes.split(',');
            if (splittedValues.length <= 3) {
                $scope.message = "Enjoy!";
            } else {
                $scope.message = "Too much!";
            }
        };
    }
})();