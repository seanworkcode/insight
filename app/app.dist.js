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

        var tooltip = d3.tip();
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


        $scope.prepareTooltip = function (filePath, targetId) {

            $http.get(filePath).success(function(content) {

                var codedContent = '<pre class="language-javascript">' + content + '</pre>';

                tooltip.html(d3.functor(codedContent));

                var element = d3.select(targetId)
                    .call(tooltip)
                    .on('click', $scope.toggleTooltipVisibilty);

            });

        };

        $scope.$on('$routeChangeStart', function(next, current) {
            tooltip.hide();
        });

        $scope.toggleTooltipVisibilty = function() {
            var textElement = d3.select(this.previousElementSibling);
            if (visibleButton) {
                visibleButton.text("See the code");
            }

            if (tooltip.style('opacity') === "0") {
                tooltip.show();
                textElement.text("Hide the code");
                visibleButton = textElement;
            }
            else {
                tooltip.hide();
            }
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
            $http.get(filePath).success(function(content) {
                angular.element('#codeContainer').html('<code id="codeItem" class="language-javascript loading">' + content + '</code>');
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


(function () {
    'use strict';

    function gettingStartedController($scope, ExamplesResource, $http) {
        $scope.examples = ExamplesResource.query();
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

        var chart = new insight.Chart('Ages', '#chart')
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

        chart.draw();
    }

    angular.module('insightChartsControllers').controller('GettingStarted', ['$scope', 'ExamplesResource', '$http', gettingStartedController]);
}());

(function()
{
    'use strict';

    angular.module('insightChartsControllers').controller('GettingStartedWithGroupings', ['$scope', 'ExamplesResource', '$http',
        function($scope, ExamplesResource, $http)
        {
            $scope.examples = ExamplesResource.query();
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
