(function()
{
    'use strict';

    function MainCtrl ($scope, ExamplesResource) {
        $scope.title = "InsightJS";
        $scope.examples = ExamplesResource.query();
    }

    angular.module('insightChartsControllers')
        .controller('MainCtrl', ['$scope', 'ExamplesResource', MainCtrl]);

}());

