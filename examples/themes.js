$(document)
    .ready(function()
    {
        var chart = new insight.Chart('League', '#league')
            .width(500)
            .height(500)
            .legend(new insight.Legend());

        var x = new insight.Axis('Team', insight.scales.ordinal)
            .tickLabelRotation(45)
            .isOrdered(true);

        var y = new insight.Axis('Points', insight.scales.linear);
        chart.xAxis(x);
        chart.yAxis(y);

        d3.json('datasets/football_teams.json', function(leaguePlaces)
        {
            var propertyFunction = function(property)
            {
                return function(obj)
                {
                    return obj[property];
                };
            };

            var currentPoints = new insight.ColumnSeries('Current', leaguePlaces, x, y)
                .keyFunction(propertyFunction('teamName'))
                .valueFunction(propertyFunction('currentPoints'));

            var targetPoints = new insight.MarkerSeries('Target', leaguePlaces, x, y)
                .keyFunction(propertyFunction('teamName'))
                .valueFunction(propertyFunction('targetPoints'));

            chart.series([currentPoints, targetPoints]);
            selectButton(themeButtons[0].button);
            setChartTheme(themeButtons[0].theme);
        });

        function setChartTheme(theme)
        {
            chart.applyTheme(theme);
            chart.draw();
        };

        var themeButtons = [
        {
            theme: new insight.LightTheme(),
            button: '#light-theme'
        },
        {
            theme: new insight.WarmTheme(),
            button: '#warm-theme'
        }];

        themeButtons.forEach(function(themeButton)
        {
            $(themeButton.button)
                .click(function()
                {
                    clearButtonSelection();
                    selectButton(themeButton.button);
                    setChartTheme(themeButton.theme);
                });
        });

        function clearButtonSelection()
        {
            themeButtons.forEach(function(themeButton)
            {
                $(themeButton.button)
                    .removeClass('selected');
            });
        };

        function selectButton(button)
        {
            $(button)
                .addClass('selected');
        };
    });
