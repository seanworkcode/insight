(function(insight) {

    /**
     * A Theme for drawing on a lightly coloured background. Sets a number of the properties defined in the Theme base
     * class.
     * @constructor
     */
    insight.RedTheme = function RedTheme() {

        var self = this;

        insight.Theme.apply(self);

        //Configure for axis
        self.axisStyle.gridlineWidth = 2;
        self.axisStyle.gridlineColor = '#DBECE4';
        self.axisStyle.shouldShowGridlines = false;

        self.axisStyle.tickSize = 2;
        self.axisStyle.tickPadding = 10;

        self.axisStyle.axisLineWidth = 2;
        self.axisStyle.axisLineColor = '#73A790';
        self.axisStyle.tickLineWidth = 2;
        self.axisStyle.tickLineColor = '#3E7C61';
        self.axisStyle.tickLabelFont = '12pt Times New Roman';
        self.axisStyle.tickLabelColor = '#011324';
        self.axisStyle.axisTitleFont = '13pt Times New Roman';
        self.axisStyle.axisTitleColor = '#011324';

        //Configure for chart
        self.chartStyle.seriesPalette = ['#BD2929', '#2994BD', '#70BD29', '#0A381B', '#011324'];
        self.chartStyle.fillColor = '#fff';
        self.chartStyle.titleFont = 'bold 12pt Times New Roman';
        self.chartStyle.titleColor = '#000';

        //Configure series
        self.seriesStyle.shouldShowPoints = true;
        self.seriesStyle.lineStyle = 'linear';

        //Configure table
        self.tableStyle.headerFont = 'bold 14pt Times New Roman';
        self.tableStyle.headerTextColor = '#011324';
        self.tableStyle.rowHeaderFont = 'bold 12pt Times New Roman';
        self.tableStyle.rowHeaderTextColor = '#011324';
        self.tableStyle.cellFont = '12pt Times New Roman';
        self.tableStyle.cellTextColor = '#011324';

        self.tableStyle.headerDivider = '1px solid #BD2929';

        self.tableStyle.headerBackgroundColor = 'white';
        self.tableStyle.rowBackgroundColor = '#DBECE4';
        self.tableStyle.rowAlternateBackgroundColor = 'white';
    };

    insight.RedTheme.prototype = Object.create(insight.Theme.prototype);
    insight.RedTheme.prototype.constructor = insight.RedTheme;

})(insight);
