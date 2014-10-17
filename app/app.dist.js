(function()
{
    'use strict';

    /* App Module */

    var insightCharts = angular.module('insightCharts', [
        'ngRoute',
        'insightChartsControllers',
        'insightChartsServices',
        'ui.bootstrap'
    ]);
}());

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

(function() {
    //This file has been prefixed with underscore so that insightChartsControllers is concatenated in the correct order
    angular.module('insightChartsControllers', []);
})();

(function () {

    'use strict';

    function exampleController($scope, $http, $routeParams, ResolveExample) {

        $scope.onHtmlLoaded = function () {
            $scope.loadContent();
        };

        //This function is responsible for loading the script and CSS specific to the example
        $scope.loadContent = function () {
            var script = $scope.page.script;
            var css = $scope.page.partialCSS;

            $http.get(script).then(function (result) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.text = result.data;

                var style = document.createElement("link");
                style.type = "text/css";
                style.rel = "stylesheet";
                style.href = css;

                document.body.appendChild(script);
                document.body.appendChild(style);

                Prism.highlightAll();
            });
        };

        ResolveExample.get($routeParams.example, function (page) {
            $scope.$parent.title = page.pageName;
            $scope.page = page;
        });
    }

    angular.module('insightChartsControllers')
        .controller('Example', ['$scope', '$http', '$routeParams', 'ResolveExample', exampleController]);

}());

(function()
{
    'use strict';
    
    /**
     * This method turns JSON string properties into Dates and ints where they need to be
     * This is the sort of preprocessing I would like the library to handle, eithe rwith a provided type mapping or automatically.
     * @param {object[]} data - The input data
     */
    function preprocess(data) {
        data.forEach(function(d)
        {
            d.releaseDate = new Date(d.releaseDate);
            d.fileSizeBytes = +d.fileSizeBytes;
        });
    }

    function indexController($scope, ExamplesResource, $http)
    {
        $scope.examples = ExamplesResource.query();
        $scope.$parent.title = 'InsightJS - Open Source Analytics and Visualization for JavaScript';
        $scope.selectedId = '';

        var chartGroup, genreGrouping, languageGrouping;

        var visibleButton = null;

        $scope.filter = function(genres, languages) {

            chartGroup.clearFilters();

            if (genres) {
                genres.forEach(function(genre) {
                    chartGroup.filterByGrouping(genreGrouping, genre);
                });
            }

            if (languages) {

                languages.forEach(function(language) {
                    chartGroup.filterByGrouping(languageGrouping, language);
                });

            }

        };

        $scope.clearFilters = function() {
            chartGroup.clearFilters();
        };

        // need to improve dependency management here, to allow the controller to know that it will need to load d3 and insight instead of just assuming they'll be there
        d3.json('datasets/appstore.json', function(data)
        {
            preprocess(data);

            var dataset = new insight.DataSet(data);
            chartGroup = new insight.ChartGroup();

            genreGrouping = dataset.group('genre', function(d)
            {
                return d.primaryGenreName;
            })
                .sum(['userRatingCount'])
                .mean(['price', 'averageUserRating', 'userRatingCount', 'fileSizeBytes']);

            languageGrouping = dataset.group('languages', function(d)
            {
                return d.languageCodesISO2A;
            }, true)
                .count(['languageCodesISO2A']);

            var genreChart = createGenreCountChart(chartGroup, genreGrouping);
            var bubbleChart = createBubbleChart(chartGroup, genreGrouping);
            var languageChart = createLanguageChart(chartGroup, languageGrouping);

            chartGroup.draw();

        });

        $scope.showChartCode = function(buttonId, filePath) {
            $scope.selectedId = buttonId;
            $scope.loadCodeIntoContainer(filePath);
        };



        $scope.loadCodeIntoContainer = function(filePath) {
            $http({method: 'GET', url: filePath, cache: true}).
                success(function(data) {
                    angular.element('#codeContainer').html('<code id="codeItem" class="language-javascript loading">' + data + '</code>');
                    $scope.showCode = true;
                });
        };
    }

    angular.module('insightChartsControllers').controller('Index', ['$scope', 'ExamplesResource', '$http', indexController]);
}());

(function()
{
    'use strict';

    function MainCtrl ($scope, ExamplesResource) {
        $scope.title = "InsightJS";
        $scope.examples = ExamplesResource.query();

        // Fix to allow dropdown menu to function with a single click
        $('.dropdown-toggle')
            .click(function(e)
            {
                e.preventDefault();
                e.stopPropagation();

                return false;
            });
    }

    angular.module('insightChartsControllers')
        .controller('MainCtrl', ['$scope', 'ExamplesResource', MainCtrl]);

}());

(function() {
    //This file has been prefixed with underscore so that insightChartsServices is concatenated in the correct order
    angular.module('insightChartsServices', ['ngResource']);
})();

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

(function() {

    'use strict';

    /*
     * Listens to elements that change content and highlights the syntax
     */
    function codeHighlightDirective() {
        return function (scope) {
            scope.$watch(function () {
                Prism.highlightElement(angular.element('#codeItem')[0]);
            });
        };
    }

    angular.module('insightCharts').directive('codeHighlightRedraw', codeHighlightDirective);
})();

(function() {

    'use strict';

    /*
     * Allows a controller to do something when the user presses the escape key.
     */
     function escapeKeyDirective($document) {
        return function (scope, element, attrs) {

            $document.keydown(function (event) {
                if (event.which === 27) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEscapeKey);
                    });

                    event.preventDefault();
                }
            });

        };
    }

    angular.module('insightCharts').directive('ngEscapeKey', escapeKeyDirective);
})();


function createBubbleChart(chartGroup, bubbleData) {

    var bubbleChart = new insight.Chart('Bubble Chart', '#bubble-chart')
        .width(300)
        .height(400);

    var xAxis = new insight.Axis('Average Rating', insight.scales.linear)
        .tickFrequency(1);

    var yAxis = new insight.Axis('', insight.scales.linear)
        .tickLabelFormat(insight.formatters.currencyFormatter);

    bubbleChart
        .xAxis(xAxis)
        .yAxis(yAxis)
        .title('App price vs. rating vs. filesize (radius)');

    var bubbles = new insight.BubbleSeries('bubbles', bubbleData, xAxis, yAxis)
        .keyFunction(function(d) {
            return d.value.averageUserRating.mean;
        })
        .valueFunction(function(d) {
            return d.value.price.mean;
        })
        .radiusFunction(function(d) {
            return Math.sqrt(d.value.fileSizeBytes.mean);
        })
        .tooltipFunction(function(d) {
            var fileSize = d.value.fileSizeBytes.mean / 1024 / 1024;
            return d.key + ": " + Math.round(fileSize) + "MB";
        });

    bubbleChart.series([bubbles]);
    chartGroup.add(bubbleChart);
}



function createGenreCountChart(chartGroup, genreData){

    var chart = new insight.Chart('Genre Chart', "#genre-count")
        .width(450)
        .height(400);

    var y = new insight.Axis('', insight.scales.ordinal)
        .tickSize(0)
        .tickPadding(5)
        .isOrdered(true);

    var x = new insight.Axis('', insight.scales.linear)
        .hasReversedPosition(true)
        .tickPadding(0)
        .tickSize(0)
        .lineWidth(0)
        .lineColor('#fff');

    chart.xAxis(x)
        .yAxis(y)
        .title("Total number of Apps by genre");

    var series = new insight.RowSeries('genre', genreData, x, y)
        .valueFunction(function(d){ return d.value.count; });

    chart.series([series]);
    chartGroup.add(chart);
}



function createLanguageChart(chartGroup, languages){

    var chart = new insight.Chart('Language Chart', '#languages')
        .width(350)
        .height(400);

    var x = new insight.Axis('Language', insight.scales.ordinal)
        .isOrdered(true);

    var y = new insight.Axis('', insight.scales.linear);

    chart.xAxis(x)
        .yAxis(y)
        .title("Total number of Apps by language");

    var lSeries = new insight.ColumnSeries('languages', languages, x, y)
        .top(10);

    chart.series([lSeries]);
    chartGroup.add(chart);
}


(function() {

    'use strict';

    /*
     * Listens to elements that change content and highlights the syntax
     */
    function apiDocsDirective() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                page: '@',
                anchor: '@'
            },
            templateUrl: '/app/components/api-docs.directive.html'
        };
    }

    angular.module('insightCharts').directive('apiDocs', apiDocsDirective);
})();

(function() {

    'use strict';

    /*
     * Listens to elements that change content and highlights the syntax
     */
    function howToGuideDirective() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                page: '@'
            },
            templateUrl: '/app/components/how-to-guide.directive.html'
        };
    }

    angular.module('insightCharts').directive('howToGuide', howToGuideDirective);
})();

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
            .height(350)
            .title('Ages of People');

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

    function gettingStartedController($scope, ExamplesResource, $http) {
        $scope.examples = ExamplesResource.query();
        $scope.$parent.title = 'Getting Started - InsightJS';

        Prism.highlightAll();

        var chart = createGettingStartedChart('#chart');

        chart.draw();
    }

    angular.module('insightChartsControllers').controller('GettingStarted', ['$scope', 'ExamplesResource', '$http', gettingStartedController]);
}());

(function()
{
    'use strict';

    function ChartController ($scope, $location, $anchorScroll, $timeout) {

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };

        // to-do think of a better way - maybe find last loading element?
        $timeout(function(){
            Prism.highlightAll();
        }, 200);
    }


    angular.module('insightChartsControllers').controller('HowToChartController', ['$scope', '$location', '$anchorScroll', '$timeout', ChartController]);
}());

(function()
{
    'use strict';

    function DataController ($scope, $location, $anchorScroll, $timeout) {

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };

        // to-do think of a better way - maybe find last loading element?
        $timeout(function(){
            Prism.highlightAll();
        }, 200);
    }

    angular.module('insightChartsControllers').controller('HowToDataController', ['$scope', '$location', '$anchorScroll', '$timeout', DataController]);
}());

(function()
{
    'use strict';

    function HowToStyleController ($scope, $location, $anchorScroll, $timeout) {

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };

        // to-do think of a better way - maybe find last loading element?
        $timeout(function(){
            Prism.highlightAll();
        }, 200);
    }

    angular.module('insightChartsControllers').controller('HowToStyleController', ['$scope', '$location', '$anchorScroll', '$timeout', HowToStyleController]);
}());

(function() {

    'use strict';

    function howToInteractiveAxis($scope) {

        $scope.$parent.title = 'How to - Use an interactive axis';

        Prism.highlightAll();

        $scope.loadChart = function() {
            var sinData = [];
            for (var degrees = 0; degrees < 360 * 3; degrees += 15) {

                var radians = degrees * Math.PI / 180;

                sinData.push({
                    x: degrees,
                    y: Math.sin(radians) + 1
                });
            }

            var dataset = new insight.DataSet(sinData);

            var chart = new insight.Chart('sin', '#interactive-chart')
                .width(450)
                .height(250)
                .title('y = sin(x) + 1');

            var x = new insight.Axis('x', insight.scales.linear);
            var y = new insight.Axis('y', insight.scales.linear);

            chart.xAxis(x);
            chart.yAxis(y);

            chart.setInteractiveAxis(x);

            var line = new insight.LineSeries('sin-x', dataset, x, y)
                .keyFunction(function(d){
                    return d.x;
                })
                .valueFunction(function(d){
                    return d.y;
                });

            chart.series([line]);

            chart.draw();
        };
    }

    angular.module('insightChartsControllers')
        .controller('HowToInteractiveAxis', ['$scope', howToInteractiveAxis]);

}());

/**
 * Created by soneill on 14/10/14.
 */
(function()
{
    'use strict';

    function LegendController ($scope) {
        Prism.highlightAll();

        $scope.loadChart = function() {
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

            var chart = new insight.Chart('Ages', '#legend-chart')
                .width(500)
                .height(350)
                .title('Ages of People')
                .legend(new insight.Legend());

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

            chart.draw();
        };
    }

    angular.module('insightChartsControllers').controller('HowToLegend', ['$scope', LegendController]);
}());

(function () {

    'use strict';

    function howToMultipleSeries($scope) {
        $scope.$parent.title = 'How to - Make a chart with multiple series';

        Prism.highlightAll();

        $scope.loadChart = function() {
            var leaguePlaces = [
                {
                    teamName: 'Chuffed FC',
                    currentPosition: 5,
                    targetPoints: 50,
                    currentPoints: 18
                },
                {
                    teamName: 'Old Boys',
                    currentPosition: 3,
                    targetPoints: 45,
                    currentPoints: 27
                },
                {
                    teamName: 'Hairy Harriers',
                    currentPosition: 1,
                    targetPoints: 90,
                    currentPoints: 35
                },
                {
                    teamName: 'Kings Arms',
                    currentPosition: 2,
                    targetPoints: 40,
                    currentPoints: 34
                },
                {
                    teamName: 'YMCA Athletic',
                    currentPosition: 6,
                    targetPoints: 35,
                    currentPoints: 18
                },
                {
                    teamName: 'Wasters',
                    currentPosition: 7,
                    targetPoints: 3,
                    currentPoints: 10
                },
                {
                    teamName: 'Dreamers',
                    currentPosition: 8,
                    targetPoints: 74,
                    currentPoints: 2
                },
                {
                    teamName: 'Posers',
                    currentPosition: 4,
                    targetPoints: 65,
                    currentPoints: 20
                },
                {
                    teamName: 'Hackney Hackers',
                    currentPosition: 3,
                    targetPoints: 38,
                    currentPoints: 22
                }];

            var dataset = new insight.DataSet(leaguePlaces);

            var chart = new insight.Chart('League', '#multiple-chart')
                .width(500)
                .height(500)
                .legend(new insight.Legend());

            var x = new insight.Axis('Team', insight.scales.ordinal)
                .tickLabelRotation(45)
                .isOrdered(true);

            var y = new insight.Axis('Points', insight.scales.linear);

            chart.xAxis(x);
            chart.yAxis(y);

            var teamNameFunc = function(d)
            {
                return d.teamName;
            };

            var currentPoints = new insight.ColumnSeries('Current', dataset, x, y)
                .keyFunction(teamNameFunc)
                .valueFunction(function(d)
                {
                    return d.currentPoints;
                });

            var targetPoints = new insight.MarkerSeries('Target', dataset, x, y)
                .keyFunction(teamNameFunc)
                .valueFunction(function(d)
                {
                    return d.targetPoints;
                })
                .widthFactor(0.7);

            chart.series([currentPoints, targetPoints]);

            chart.draw();
        };
    }

    angular.module('insightChartsControllers')
        .controller('HowToMultipleSeries', ['$scope', howToMultipleSeries]);

}());


(function()
{
    'use strict';

    function HowToDataCorrelationController ($scope, $location, $anchorScroll, $timeout) {

        $scope.loadData = function() {
            d3.json('datasets/appstore.json', function(data)
            {
                data.forEach(function(d)
                {
                    d.releaseDate = new Date(d.releaseDate);
                    d.fileSizeBytes = +d.fileSizeBytes;
                });

                var chartGroup = new insight.ChartGroup();

                var dataset = new insight.DataSet(data);

                var genres = dataset.group('genre', function(d)
                {
                    return d.primaryGenreName;
                })
                    .sum(['userRatingCount'])
                    .mean(['price', 'averageUserRating', 'userRatingCount', 'fileSizeBytes']);

                var scatterChart = new insight.Chart('Chart 3', '#bubbleChart')
                    .width(500)
                    .height(400)
                    .margin(
                    {
                        top: 50,
                        left: 160,
                        right: 40,
                        bottom: 80
                    });

                var xAxis = new insight.Axis('Average Number of Ratings', insight.scales.linear)
                    .tickSize(2);

                var yAxis = new insight.Axis('Average Price', insight.scales.linear);

                scatterChart.xAxis(xAxis);
                scatterChart.yAxis(yAxis);

                var scatter = new insight.ScatterSeries('bubbles', genres, xAxis, yAxis)
                    .keyFunction(function(d)
                    {
                        return d.value.userRatingCount.mean;
                    })
                    .valueFunction(function(d)
                    {
                        return d.value.price.mean;
                    })
                    .tooltipFunction(function(d)
                    {
                        return d.key;
                    });

                scatterChart.series([scatter]);
                buttonClick();






                $('.btn')
                    .button();

                function buttonClick()
                {
                    var correlation = insight.correlation.fromDataProvider(genres, scatter.keyFunction(), scatter.valueFunction());
                    var coefficientDiv = document.getElementById('correlationCoefficient');
                    coefficientDiv.innerHTML = correlation.toFixed(3);

                    scatterChart.draw();
                }

                function selectButton(selectedButton, deselectedButtons)
                {
                    //Select the selected button
                    if (!$(selectedButton)
                        .hasClass('selected'))
                    {
                        $(selectedButton)
                            .addClass('selected');
                    }

                    //Deselect the other buttons
                    deselectedButtons.forEach(function(button)
                    {
                        if ($(button)
                            .hasClass('selected'))
                        {
                            $(button)
                                .removeClass('selected');
                        }
                    });

                    buttonClick();
                }

                $('#yavgrating')
                    .click(function()
                    {
                        scatter.valueFunction(function(d)
                        {
                            return d.value.averageUserRating.mean;
                        });
                        yAxis.title('Average Rating');

                        selectButton('#yavgrating', ['#yavgratings', '#yavgprice']);
                    });


                $('#yavgratings')
                    .click(function()
                    {
                        scatter.valueFunction(function(d)
                        {
                            return d.value.userRatingCount.mean;
                        });
                        yAxis.title('Average # Ratings');

                        selectButton('#yavgratings', ['#yavgrating', '#yavgprice']);
                    });

                $('#yavgprice')
                    .click(function()
                    {
                        scatter.valueFunction(function(d)
                        {
                            return d.value.price.mean;
                        });
                        yAxis.title('Average Price');

                        selectButton('#yavgprice', ['#yavgrating', '#yavgratings']);
                    });

                $('#xsumrating')
                    .click(function()
                    {
                        scatter.keyFunction(function(d)
                        {
                            return d.value.userRatingCount.sum;
                        });
                        xAxis.title('Total Ratings');

                        selectButton('#xsumrating', ['#xavgrating', '#xavgsize']);
                    });

                $('#xavgrating')
                    .click(function()
                    {
                        scatter.keyFunction(function(d)
                        {
                            return d.value.averageUserRating.mean;
                        });
                        xAxis.title('Average Rating');

                        selectButton('#xavgrating', ['#xsumrating', '#xavgsize']);
                    });

                $('#xavgsize')
                    .click(function()
                    {

                        scatter.keyFunction(function(d)
                        {
                            return d.value.fileSizeBytes.mean / 1024 / 1024;
                        });
                        xAxis.title('Average File Size (Mb)');

                        selectButton('#xavgsize', ['#xavgrating', '#xsumrating']);
                    });
            });
        };
    }

    angular.module('insightChartsControllers').controller('HowToDataCorrelationController', ['$scope', '$location', '$anchorScroll', '$timeout', HowToDataCorrelationController]);
}());

(function()
{
    'use strict';

    function HowToStyleChartController ($scope) {
        Prism.highlightAll();

        $scope.getNewChart = function(elementId) {
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

            var chart = new insight.Chart('Ages', elementId)
                .width(500)
                .height(350)
                .title('Ages of People');

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
        };

        $scope.loadChart = function() {
            var defaultThemeChart = $scope.getNewChart('#theme-chart-default-theme');
            defaultThemeChart.draw();

            var titleThemeChart = $scope.getNewChart('#theme-chart-title-theme');
            titleThemeChart.titleFont('bold 11pt Helvetica');
            titleThemeChart.draw();

            var fullThemeChart = $scope.getNewChart('#theme-chart-full-theme');
            fullThemeChart.titleFont('bold 11pt Helvetica');
            fullThemeChart.titleColor('#081717');
            fullThemeChart.seriesPalette(['#A60303', '#FFAD00', '#FF2F00', '#BD7217', '#873300']);
            fullThemeChart.draw();

        };
    }

    angular.module('insightChartsControllers').controller('HowToStyleChartController', ['$scope', HowToStyleChartController]);
}());
