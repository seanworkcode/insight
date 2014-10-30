(function()
{
    'use strict';

    function galleryController($scope, $http, $q)
    {
        $scope.$parent.title = 'InsightJS';
     
        $scope.showGallery = true;

        $scope.currentItem = undefined;

        $scope.setTemplate = function(item) {
            var oldTemplate = $scope.template;
            $scope.template = 'app/gallery/items/' + item.index;
            if (oldTemplate !== $scope.template) {
                $scope.loadItem(item);
            }
        };

        $scope.loadItems = function() {
            $scope.items = [
                {
                    index: 'barchart/index.html',
                    title: 'Awesome bar chart!',
                    thumbnail: 'barchart/thumbnail.png'
                },
                {
                    index: 'interactive/index.html',
                    title: '~ Zooming chart ~',
                    thumbnail: 'interactive/thumbnail.png'
                }
            ];
            $scope.setTemplate($scope.items[0]);
        };

        $scope.loadItem = function(item) {
            $scope.loadCode(item.index).then(function(code) {
                $scope.displayCode(code);
            });
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

        $scope.displayCode = function(code) {
            // angular.element('#gallery-code').html('<code id="codeItem" class="language-javascript loading">' + code + '</code>');
            angular.element('#gallery-code').text(code);
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
