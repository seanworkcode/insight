(function() {

    function reDraw() {
        return {
            link: function($scope, $element, $attrs)
            {
                $scope.$watch($attrs.accessor + '()', function(v)
                {
                    if (v) $element[0].value = v;
                });
                $element.bind('input', function(e)
                {
                    $scope.$apply($attrs.accessor + '(' + e.target.value + ')');
                    $scope.$apply($attrs.func);
                });
            }
        };
    }

    angular.module('insightCharts').directive('reDraw', reDraw);

})();

