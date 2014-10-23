(function()
{
    angular.module('insightCharts')
        .config(['$routeProvider',
            function($routeProvider)
            {
                $routeProvider.
                when('/',
                    {
                        templateUrl: 'app/partials/index.html',
                        controller: 'Index'
                    })
                    .when('/gettingStarted',
                    {
                        templateUrl: 'app/getting-started/getting-started.html',
                        controller: 'GettingStarted'
                    })
                    .when('/how-to',
                    {
                        templateUrl: 'app/how-to/how-to-index.html'
                    })
                    .when('/how-to/axis',
                    {
                        templateUrl: 'app/how-to/axis/axis.html',
                        controller: 'HowToAxisController'
                    })
                    .when('/how-to/chart',
                    {
                        templateUrl: 'app/how-to/chart/chart.html',
                        controller: 'HowToChartController'
                    })
                    .when('/how-to/style',
                    {
                        templateUrl: 'app/how-to/style/style.html',
                        controller: 'HowToStyleController'
                    })
                    .when('/how-to/data',
                    {
                        templateUrl: 'app/how-to/data/data.html',
                        controller: 'HowToDataController'
                    })
                    .otherwise(
                    {
                        redirectTo: '/'
                    });
            }
        ]);
})();
