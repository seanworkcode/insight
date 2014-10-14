(function() {

    'use strict';

    function resolveExampleService($http)
    {
        var factory = {};

        factory.get = function(input, callback)
        {
            $http.get('pages.json')
                .success(function(data)
                {
                    var page = data.filter(function(item)
                    {
                        return item.name == input;
                    });
                    if (page.length == 1)
                    {
                        callback(page[0]);
                    }

                    return [];
                });
        };

        return factory;
    }

    angular.module('insightChartsServices').factory('ResolveExample', ['$http', resolveExampleService]);

})();
