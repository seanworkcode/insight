(function () {

    function examplesResource($resource)
    {
        return $resource(
            'pages.json',
            {},
            {
                query:
                {
                    method: 'GET',
                    params:
                    {},
                    isArray: true
                }
            }
        );
    }

    angular.module('insightChartsServices').factory('ExamplesResource', ['$resource', examplesResource]);

})();