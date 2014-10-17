(function()
{
    'use strict';

    function DataController ($scope, $location, $anchorScroll, $timeout) {

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };

        // to-do think of a better way - maybe find last loading element?
        $timeout(function(){
            Prism.highlightAll();
        }, 200);
    }

    angular.module('insightChartsControllers').controller('HowToDataController', ['$scope', '$location', '$anchorScroll', '$timeout', DataController]);
}());
