(function()
{
    'use strict';

    angular.module('insightChartsControllers').controller('GettingStarted', ['$scope', 'Examples', '$http',
        function($scope, Examples, $http)
        {
            $scope.examples = Examples.query();
            $scope.$parent.title = 'Getting Started - InsightJS';

        }
    ]);
}());
