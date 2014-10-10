(function()
{
    'use strict';

    function MainCtrl ($scope, Examples) {
        $scope.title = "InsightJS";
        $scope.examples = Examples.query();
    }

    angular.module('insightChartsControllers')
        .controller('MainCtrl', ['$scope', 'Examples', MainCtrl]);

}());
