(function () {

    'use strict';

    function exampleController($scope, $http, $routeParams, ResolveExample) {

        $scope.onHtmlLoaded = function () {
            $scope.loadContent();
        };

        //This function is responsible for loading the script and CSS specific to the example
        $scope.loadContent = function () {
            var script = $scope.page.script;
            var css = $scope.page.partialCSS;

            $http.get(script).then(function (result) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.text = result.data;

                var style = document.createElement("link");
                style.type = "text/css";
                style.rel = "stylesheet";
                style.href = css;

                document.body.appendChild(script);
                document.body.appendChild(style);

                Prism.highlightAll();
            });
        };

        ResolveExample.get($routeParams.example, function (page) {
            $scope.$parent.title = page.pageName;
            $scope.page = page;
        });
    }

    angular.module('insightChartsControllers')
        .controller('Example', ['$scope', '$http', '$routeParams', 'ResolveExample', exampleController]);

}());
