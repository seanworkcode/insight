(function(insight) {

    /**
     * A Theme for drawing on a white background, uses warm colors with white as a base.
     * Sets a number of the properties defined in the Theme base class.
     * @constructor
     */
    insight.WarmTheme = function WarmTheme() {

        var self = this;

        insight.Theme.apply(self);

        //Configure for axis
        self.axisStyle.gridlineWidth = 1;
        self.axisStyle.gridlineColor = '#081717';
        self.axisStyle.shouldShowGridlines = false;

        self.axisStyle.tickSize = 2;
        self.axisStyle.tickPadding = 10;

        self.axisStyle.axisLineWidth = 1;
        self.axisStyle.axisLineColor = '#081717';
        self.axisStyle.tickLineWidth = 1;
        self.axisStyle.tickLineColor = '#081717';
        self.axisStyle.tickLabelFont = '11pt Helvetica';
        self.axisStyle.tickLabelColor = '#081717';
        self.axisStyle.axisTitleFont = '12pt Helvetica';
        self.axisStyle.axisTitleColor = '#081717';

        //Configure for chart
        self.chartStyle.seriesPalette = ['#A60303', '#FFAD00', '#FF2F00', '#BD7217', '#873300'];
        self.chartStyle.fillColor = '#fff';
        self.chartStyle.titleFont = 'bold 11pt Helvetica';
        self.chartStyle.titleColor = '#081717';

        //Configure series
        self.seriesStyle.shouldShowPoints = true;
        self.seriesStyle.lineStyle = 'linear';

        //Configure table
        self.tableStyle.headerFont = 'bold 12pt Helvetica';
        self.tableStyle.headerTextColor = '#081717';
        self.tableStyle.rowHeaderFont = 'bold 11pt Helvetica';
        self.tableStyle.rowHeaderTextColor = '#081717';
        self.tableStyle.cellFont = '11pt Helvetica';
        self.tableStyle.cellTextColor = '#081717';

        self.tableStyle.headerDivider = '2px solid #A60303';

        self.tableStyle.headerBackgroundColor = 'white';
        self.tableStyle.rowBackgroundColor = '#FF811E';
        self.tableStyle.rowAlternateBackgroundColor = '#FFE525';
    };

    insight.WarmTheme.prototype = Object.create(insight.Theme.prototype);
    insight.WarmTheme.prototype.constructor = insight.WarmTheme;

})(insight);
