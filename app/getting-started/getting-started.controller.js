(function () {
    'use strict';

    function createGettingStartedChart(domSelector) {
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

        var chart = new insight.Chart('Ages', domSelector)
            .width(500)
            .height(350);

        var x = new insight.Axis('Age', insight.scales.linear);
        var y = new insight.Axis('', insight.scales.ordinal);

        chart.xAxis(x);
        chart.yAxis(y);


        var rows = new insight.RowSeries('rows', dataset, x, y)
            .keyFunction(function (person) {
                return person.name;
            })
            .valueFunction(function (person) {
                return person.age;
            });


        chart.series([rows]);

        return chart;
    }

    function gettingStartedController($scope, $http) {
        $scope.$parent.title = 'Getting Started - InsightJS';

        Prism.highlightAll();

        var chart = createGettingStartedChart('#chart');

        chart.draw();
    }

    angular.module('insightChartsControllers').controller('GettingStarted', ['$scope', '$http', gettingStartedController]);
}());
