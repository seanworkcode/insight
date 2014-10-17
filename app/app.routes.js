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
                    .when('/how-to/axis-customisation',
                    {
                        templateUrl: 'app/how-to/axis-customisation.html',
                        controller: 'AxisCustomisation'
                    })
                    .otherwise(
                    {
                        redirectTo: '/'
                    });
            }
        ]);
})();
