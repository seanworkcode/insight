(function(insight) {

    /**
     * A Theme for drawing on a lightly coloured background. Sets a number of the properties defined in the Theme base
     * class.
     * @constructor
     */
    insight.LightTheme = function LightTheme() {

        var self = this;

        insight.Theme.apply(self);

        //Configure for axis
        self.axisStyle.gridlineWidth = 1;
        self.axisStyle.gridlineColor = '#888';
        self.axisStyle.shouldShowGridlines = false;

        self.axisStyle.tickSize = 3;
        self.axisStyle.tickPadding = 10;

        self.axisStyle.axisLineWidth = 1;
        self.axisStyle.axisLineColor = '#333';
        self.axisStyle.tickLineWidth = 1;
        self.axisStyle.tickLineColor = '#333';
        self.axisStyle.tickLabelFont = '11pt Arial';
        self.axisStyle.tickLabelColor = '#333';
        self.axisStyle.axisTitleFont = '12pt Arial';
        self.axisStyle.axisTitleColor = '#333';

        //Configure series
        self.seriesStyle.shouldShowPoints = false;
        self.seriesStyle.lineStyle = 'linear';
        self.seriesStyle.pointRadius = 3;

        //Configure table
        self.tableStyle.headerFont = 'bold 14pt Arial';
        self.tableStyle.headerTextColor = '#084594';
        self.tableStyle.rowHeaderFont = 'bold 12pt Arial';
        self.tableStyle.rowHeaderTextColor = '#2171b5';
        self.tableStyle.cellFont = '12pt Arial';
        self.tableStyle.cellTextColor = '#888';

        self.tableStyle.headerDivider = '1px solid #084594';

        self.tableStyle.headerBackgroundColor = 'white';
        self.tableStyle.rowBackgroundColor = '#c6dbef';
        self.tableStyle.rowAlternateBackgroundColor = 'white';
    };

    insight.LightTheme.prototype = Object.create(insight.Theme.prototype);
    insight.LightTheme.prototype.constructor = insight.LightTheme;

    //Set LightTheme as the default theme
    insight.defaultTheme = new insight.LightTheme();

})(insight);
