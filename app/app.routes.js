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
                    .when('/example/:example',
                    {
                        templateUrl: 'app/partials/example.html',
                        controller: 'Example'
                    })
                    .when('/gettingStarted',
                    {
                        templateUrl: 'app/getting-started/getting-started.html',
                        controller: 'GettingStarted'
                    })
                    .when('/how-to',
                    {
                        templateUrl: 'app/partials/how-to-index.html',
                        controller: 'HowTo'
                    })
                    .when('/how-to/chart',
                    {
                        templateUrl: 'app/how-to/chart.html',
                        controller: 'HowToChartController'
                    })
                    .when('/how-to/interactive',
                    {
                        templateUrl: 'app/how-to/interactive.html',
                        controller: 'HowToInteractiveAxis'
                    })
                    .when('/how-to/multipleseries',
                    {
                        templateUrl: 'app/how-to/multipleseries.html',
                        controller: 'HowToMultipleSeries'
                    })
                    .otherwise(
                    {
                        redirectTo: '/'
                    });
            }
        ]);
})();
