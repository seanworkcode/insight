(function()
{
    'use strict';

    function MainCtrl ($scope, ExamplesResource) {
        $scope.title = "InsightJS";
        $scope.examples = ExamplesResource.query();

        // Fix to allow dropdown menu to function with a single click
        $('.dropdown-toggle')
            .click(function(e)
            {
                e.preventDefault();
                e.stopPropagation();

                return false;
            });
    }

    angular.module('insightChartsControllers')
        .controller('MainCtrl', ['$scope', 'ExamplesResource', MainCtrl]);

}());

