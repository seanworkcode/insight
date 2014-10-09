(function()
{
    'use strict';

    angular.module('insightChartsControllers').controller('GettingStarted', ['$scope', 'Examples', '$http',
        function($scope, Examples, $http)
        {
            $scope.examples = Examples.query();
            $scope.$parent.title = 'Getting Started - InsightJS';

            Prism.highlightAll();

            var data = [
                { "name": "Michelle Hopper", "age": 26, "eyeColor": "green" },
                { "name": "Cochran Mcfadden", "age": 22, "eyeColor": "green" },
                { "name": "Jessie Mckinney", "age": 23, "eyeColor": "brown" },
                { "name": "Rhoda Reyes", "age": 40, "eyeColor": "brown" },
                { "name": "Hawkins Wolf", "age": 26, "eyeColor": "green" },
                { "name": "Lynne O'neill", "age": 39, "eyeColor": "green" },
                { "name": "Twila Melendez", "age": 26, "eyeColor": "blue" },
                { "name": "Courtney Diaz", "age": 20, "eyeColor": "brown" },
                { "name": "Burton Beasley", "age": 36, "eyeColor": "green" },
                { "name": "Mccoy Gray", "age": 25, "eyeColor": "brown" },
                { "name": "Janie Benson", "age": 30, "eyeColor": "green" },
                { "name": "Cherie Wilder", "age": 30, "eyeColor": "green" }
            ];

            var dataset = new insight.DataSet(data);

            var eyeColorGrouping = dataset.group('eye-color', function(d) { return d.eyeColor; });

            console.log(JSON.stringify(eyeColorGrouping.rawData(), null, 2));

            var chart = new insight.Chart('EyeColors', '#chart')
                .width(350)
                .height(350)
                .title('Number of People by Eye Color');

            var x = new insight.Axis('Eye Color', insight.scales.ordinal);

            var y = new insight.Axis('', insight.scales.linear);

            chart.xAxis(x);
            chart.yAxis(y);


            var columns = new insight.ColumnSeries('columns', eyeColorGrouping, x, y)
                .valueFunction(function(d){
                    return d.value.Count;
                });


            chart.series([columns]);

            chart.draw();
        }
    ]);
}());
