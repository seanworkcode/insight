(function()
{
    'use strict';

    /* App Module */

    var insightCharts = angular.module('insightCharts', [
        'ngRoute',
        'insightChartsControllers',
        'insightChartsServices',
        'ui.bootstrap'
    ]);


    insightCharts.config(['$routeProvider',
        function($routeProvider)
        {
            $routeProvider.
            when('/',
                {
                    templateUrl: 'app/partials/index.html',
                    controller: 'Index'
                })
                .when('/example/:example',
                {
                    templateUrl: 'app/partials/example.html',
                    controller: 'Example'
                })
                .when('/gettingStarted',
                {
                    templateUrl: 'app/partials/gettingStarted.html',
                    controller: 'GettingStarted'
                })
                .when('/explorer',
                {
                    templateUrl: 'app/partials/explorer.html',
                    controller: 'Explorer'
                })
                .otherwise(
                {
                    redirectTo: '/'
                });
        }
    ]);

}());

$('.dropdown-toggle')
    .click(function(e)
    {
        e.preventDefault();
        e.stopPropagation();

        return false;
    });
