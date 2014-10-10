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

$('.dropdown-toggle')
    .click(function(e)
    {
        e.preventDefault();
        e.stopPropagation();

        return false;
    });
