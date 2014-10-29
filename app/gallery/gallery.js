(function()
{
    'use strict';

    function galleryController($scope, $http, $q)
    {
        $scope.$parent.title = 'InsightJS';
     
        $scope.showGallery = true;

        $scope.currentItem = undefined;

        $scope.loadItems = function() {
            $scope.items = [
                {
                    title: 'Awesome bar chart!',
                    thumbnail: 'barchart/thumbnail.png',
                    dataPath: 'barchart/data.json',
                    script: 'barchart/script.js',
                    desc: 'As simple as it gets. A bar chart for viewing one data set against the other.'
                },
                {
                    title: '~ Zooming chart ~',
                    thumbnail: 'interactive/thumbnail.png',
                    dataPath: 'interactive/data.json',
                    script: 'interactive/script.js',
                    desc: 'Interactive chart, try scrolling while the mouse is hovered over the chart to watch the scale change'
                }
            ];
        };

        $scope.loadItem = function(item) {
            $scope.currentItem = item;
            $scope.loadData(item.dataPath).then(function(data) {
                $scope.loadCode(item.script).then(function(code) {
                    $scope.displayChart(data, code);
                    $scope.displayCode(code);
                    $scope.showGallery = false;
                });
            });
        };

        $scope.loadData = function(dataPath) {
            var deferred = $q.defer();
            d3.json('app/gallery/items/' + dataPath, function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        $scope.loadCode = function(filePath) {
            var deferred = $q.defer();
            $http({method: 'GET', url: 'app/gallery/items/' + filePath, cache: true}).
                success(function(code) {
                    deferred.resolve(code);
                }
            );
            return deferred.promise;
        };

        $scope.displayChart = function(data, code) {
            var script = document.createElement('script');
            script.src = 'data:text/javascript,' + encodeURI(code);
            document.body.appendChild(script);
            script.onload = function() {
                chartingFunction.call(this, data.data, '#gallery-chart');
            };
        };

        $scope.displayCode = function(code) {
            angular.element('#gallery-code').html('<code id="codeItem" class="language-javascript loading">' + code + '</code>');
            Prism.highlightAll();
        };

        $scope.closeItem = function() {
            $scope.showGallery = true;
            angular.element('#gallery-chart').empty();
            angular.element('#gallery-code').empty();
        };
    }

    angular.module('insightChartsControllers').controller('Gallery', ['$scope', '$http', '$q', galleryController]);
}());
