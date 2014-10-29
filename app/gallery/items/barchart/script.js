function chartingFunction(data, chartElementId) {
    
    var dataset = new insight.DataSet(data);

    var chart = new insight.Chart('Ages', chartElementId)
        .width(800)
        .height(600)
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
}
