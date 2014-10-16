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
