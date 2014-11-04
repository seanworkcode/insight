(function(insight) {

    /**
     * A Legend listing out the series on a chart
     * @constructor
     */
    insight.Legend = function Legend() {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            initialised = false;

        // Private functions ------------------------------------------------------------------------------------------

        function blobPositionY(item, index) {
            return index * 20 + 5;
        }

        function blobFillColor(item) {
            return item.color();
        }

        function textPositionY(item, index) {
            return index * 20 + 14;
        }

        function textContent(item) {
            return item.name;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        self.init = function(chart) {
            initialised = true;

            //Get rid of any previous legend objects
            if (chart.legendView !== null) {
                chart.legendView.removeChild(chart.legendBox);
                chart.legendView.removeChild(chart.legendItems);
                chart.chartSVG.removeChild(chart.legendView);
            }

            chart.legendView = chart.chartSVG.append("g")
                .attr("class", insight.constants.LegendView)
                .attr("transform", "translate(" + (chart.width() - 80) + ",30)");

            chart.legendBox = chart.legendView.append("rect")
                .style("stroke", 'black')
                .style("stroke-width", 1)
                .style("fill", 'white');

            chart.legendItems = chart.legendView.append("g")
                .attr("class", insight.constants.Legend);
        };

        self.draw = function(chart) {
            if (!initialised) {
                self.init(chart);
            }

            var series = chart.series();
            var ctx = chart.measureCanvas.getContext('2d');
            ctx.font = "12px sans-serif";

            chart.legendItems.selectAll('rect')
                .data(series)
                .enter()
                .append("rect")
                .attr("x", 5)
                .attr("y", blobPositionY)
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", blobFillColor);

            chart.legendItems.selectAll('rect')
                .data(series)
                .transition()
                .style('fill', blobFillColor);

            chart.legendItems.selectAll('text')
                .data(series)
                .enter()
                .append("text")
                .attr("x", 20)
                .attr("y", textPositionY)
                .attr("width", function(item) {
                    return ctx.measureText(item.name).width;
                })
                .attr("height", 20)
                .text(textContent)
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "black");

            var legendHeight = 0;
            var legendWidth = 0;

            for (var index = 0; index < series.length; index++) {
                var seriesTextWidth = ctx.measureText(series[index].name)
                    .width;
                legendWidth = Math.max(legendWidth, seriesTextWidth + 25);
            }
            legendHeight = series.length * 20;

            // Adjust legend to tightly wrap items
            chart.legendBox
                .attr("width", legendWidth)
                .attr("height", legendHeight);

            chart.legendItems
                .attr("width", legendWidth)
                .attr("height", legendHeight);
        };

    };

})(insight);
