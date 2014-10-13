$(document)
    .ready(function()
    {
        d3.json('datasets/revenuereport.json', function(data)
        {
            var dataset = new insight.DataSet(data);

            var clientData = createClientGroup(dataset);

            var revenueChart = createEmptyChart();

            var x = new insight.Axis('', insight.scales.ordinal)
                .tickLabelOrientation('tb');

            var y = new insight.Axis('', insight.scales.linear)
                .tickLabelFormat(function(tickValue)
                {
                    var thousands = (tickValue / 1000)
                        .toFixed(0);
                    return '$' + thousands + 'k';
                });

            var clientRevenues = new insight.ColumnSeries('clientColumn', clientData, x, y)
                .valueFunction(function(d)
                {
                    return d.value.CurrentRevenue.sum;
                })
                .tooltipFormat(insight.formatters.currencyFormatter);

            revenueChart.xAxis(x)
                .yAxis(y)
                .series([clientRevenues]);

            revenueChart.draw();
        });

        function createClientGroup(dataset)
        {
            return dataset.group('clients', function(d)
                {
                    return d.Client;
                })
                .sum(['CurrentRevenue'])
                .orderingFunction(function(a, b)
                {
                    return b.value.CurrentRevenue.sum - a.value.CurrentRevenue.sum;
                });
        }

        function createEmptyChart()
        {

            var chart = new insight.Chart('Revenue', "#revenue")
                .width(500)
                .height(400);

            return chart;
        }

    });
