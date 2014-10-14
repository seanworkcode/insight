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
                        templateUrl: 'app/partials/gettingStarted.html',
                        controller: 'GettingStarted'
                    })
                    .when('/how-to',
                    {
                        templateUrl: 'app/partials/how-to-index.html',
                        controller: 'HowTo'
                    })
                    .otherwise(
                    {
                        redirectTo: '/'
                    });
            }
        ]);
})();
