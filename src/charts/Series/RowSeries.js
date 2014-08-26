(function(insight) {

    /**
     * The RowSeries class extends the Series class and draws horizontal bars on a Chart
     * @class insight.RowSeries
     * @param {string} name - A uniquely identifying name for this chart
     * @param {DataSet} data - The DataSet containing this series' data
     * @param {insight.Scales.Scale} x - the x axis
     * @param {insight.Scales.Scale} y - the y axis
     * @param {object} color - a string or function that defines the color to be used for the items in this series
     */
    insight.RowSeries = function RowSeries(name, data, x, y) {

        insight.Series.call(this, name, data, x, y);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            stacked = false,
            seriesName = '',
            seriesFunctions = {};

        // Internal variables -------------------------------------------------------------------------------------------

        self.valueAxis = x;
        self.keyAxis = y;
        self.classValues = [insight.Constants.BarClass];

        self.series = [{
            name: 'default',
            valueFunction: function(d) {
                return self.valueFunction()(d);
            },
            tooltipValue: function(d) {
                return self.tooltipFunction()(d);
            },
            color: self.color,
            label: 'Value'
        }];

        // Private functions ------------------------------------------------------------------------------------------

        function mouseOver(data, i) {

            var seriesName = this.getAttribute('in_series');
            var seriesFunction = seriesFunctions[seriesName];

            self.mouseOver.call(this, data, i, seriesFunction);
        }

        // Internal functions -----------------------------------------------------------------------------------------

        /*
         * Given an object representing a data item, this method returns the largest value across all of the series in the ColumnSeries.
         * This function is mapped across the entire data array by the findMax method.
         * @memberof! insight.RowSeries
         * @instance
         * @param {object} data - An item in the object array to query
         * @returns {Number} - The maximum value within the range of the values for this series on the given axis.
         */
        self.seriesMax = function(d) {
            var max = 0;
            var seriesMax = 0;

            var stacked = self.isStacked();

            for (var series in self.series) {
                var s = self.series[series];

                var seriesValue = s.valueFunction(d);

                seriesMax = stacked ? seriesMax + seriesValue : seriesValue;

                max = seriesMax > max ? seriesMax : max;
            }

            return max;
        };

        /*
         * Extracts the maximum value on an axis for this series.
         * @memberof! insight.RowSeries
         * @instance
         * @returns {Number} - The maximum value within the range of the values for this series on the given axis.
         */
        self.findMax = function() {
            var max = d3.max(self.dataset(), self.seriesMax);

            return max;
        };

        self.calculateXPos = function(func, d) {
            if (!d.xPos) {
                d.xPos = 0;
            }
            var myPosition = d.xPos;

            d.xPos += func(d);

            return myPosition;
        };

        self.yPosition = function(d) {
            return self.y.scale(self.keyFunction()(d));
        };

        self.calculateYPos = function(thickness, d) {
            if (!d.yPos) {
                d.yPos = self.yPosition(d);
            } else {
                d.yPos += thickness;
            }
            return d.yPos;
        };

        self.xPosition = function(d) {

            var func = self.currentSeries.valueFunction;

            var position = self.isStacked() ? self.x.scale(self.calculateXPos(func, d)) : 0;

            return position;
        };

        self.barThickness = function(d) {
            return self.y.scale.rangeBand(d);
        };

        self.groupedbarThickness = function(d) {

            var groupThickness = self.barThickness(d);

            var width = self.isStacked() || (self.series.length === 1) ? groupThickness : groupThickness / self.series.length;

            return width;
        };

        self.offsetYPosition = function(d) {
            var thickness = self.groupedbarThickness(d);
            var position = self.isStacked() ? self.yPosition(d) : self.calculateYPos(thickness, d);

            return position;
        };

        self.barWidth = function(d) {
            var func = self.currentSeries.valueFunction;

            return self.x.scale(func(d));
        };

        self.seriesSpecificClassName = function(d) {

            var additionalClass = ' ' + self.currentSeries.name + 'class';
            var baseClassName = self.itemClassName(d);
            var itemClassName = baseClassName + additionalClass;

            return itemClassName;
        };

        self.draw = function(chart, isDragging) {

            self.initializeTooltip(chart.container.node());
            self.selectedItems = chart.selectedItems;

            function reset(d) {
                d.yPos = 0;
                d.xPos = 0;
            }

            var data = self.dataset(),
                groupSelector = 'g.' + insight.Constants.BarGroupClass + '.' + self.name,
                groupClassName = insight.Constants.BarGroupClass + ' ' + self.name,
                barSelector = 'rect.' + insight.Constants.BarGroupClass;


            data.forEach(reset);

            var groups = chart.plotArea
                .selectAll(groupSelector)
                .data(data);


            var newGroups = groups.enter()
                .append('g')
                .attr('class', groupClassName);

            var newBars = newGroups.selectAll(barSelector);

            function click(filter) {
                return self.click(self, filter);
            }

            function duration(d, i) {
                return 200 + (i * 20);
            }

            function opacity() {
                // If we are using selected/notSelected, then make selected more opaque than notSelected
                if (this.classList && this.classList.contains("notselected")) {
                    return 0.5;
                }

                //If not using selected/notSelected, make everything semi-transparent
                return 1;
            }


            for (var seriesIndex in self.series) {

                self.currentSeries = self.series[seriesIndex];

                seriesName = self.currentSeries.name;
                seriesFunctions[seriesName] = self.currentSeries.valueFunction;

                var seriesSelector = '.' + seriesName + 'class.' + insight.Constants.BarClass;

                newBars = newGroups.append('rect')
                    .attr('class', self.seriesSpecificClassName)
                    .attr('height', 0)
                    .attr('fill', self.currentSeries.color)
                    .attr('in_series', seriesName)
                    .attr('clip-path', 'url(#' + chart.clipPath() + ')')
                    .on('mouseover', mouseOver)
                    .on('mouseout', self.mouseOut)
                    .on('click', click);

                var bars = groups.selectAll(seriesSelector)
                    .transition()
                    .duration(duration)
                    .attr('y', self.offsetYPosition)
                    .attr('x', self.xPosition)
                    .attr('height', self.groupedbarThickness)
                    .attr('width', self.barWidth)
                    .style('opacity', opacity);
            }

            groups.exit()
                .remove();
        };

        // Public functions -------------------------------------------------------------------------------------------

        /**
         * Determines whether the series should stack rows, or line them up side-by-side.
         * @memberof! insight.RowSeries
         * @instance
         * @returns {boolean} - To stack or not to stack.
         *
         * @also
         *
         * Sets whether the series should stack rows, or line them up side-by-side.
         * @memberof! insight.RowSeries
         * @instance
         * @param {boolean} shouldStack Whether the row series should be stacked.
         * @returns {this}
         */
        self.isStacked = function(shouldStack) {
            if (!arguments.length) {
                return stacked;
            }
            stacked = shouldStack;
            return self;
        };

    };

    insight.RowSeries.prototype = Object.create(insight.Series.prototype);
    insight.RowSeries.prototype.constructor = insight.RowSeries;

})(insight);
