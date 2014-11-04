(function(insight) {
    /**
     * DataSet allows [insight.Groupings]{@link insight.Grouping} to be easily created from an object array.
     * @constructor
     * @extends insight.DataProvider
     * @param {Object[]} collection - The data to be processed and represented by this DataSet.
     */
    insight.DataSet = function DataSet(data) {

        insight.DataProvider.call(this, data);

        // Private variables ------------------------------------------------------------------------------------------

        var self = this;

        /**
         * Creates an {@link insight.Grouping} for this data set.
         * @memberof! insight.DataSet
         * @instance
         * @param {String} name The name to give to the grouping.
         * @param {Function} groupFunction A function that returns a property value to use for grouping data.
         * @param {Boolean} oneToMany A one-to-many grouping should be used if the groupFunction returns an
         * array property.
         * @returns {insight.Grouping} - A grouping which allows aggregation of a data set into groups for analysis.
         * @example var dataSet = new insight.DataSet([
         *    { forename : 'Alan', height : 133, gender : 'Male' },
         *    { forename : 'Bob', height : 169, gender : 'Male' },
         *    { forename : 'Mary', height : 151, gender : 'Female' },
         *    { forename : 'Sam', height : 160, gender : 'Female' },
         *    { forename : 'Steve', height : 172, gender : 'Male' },
         *    { forename : 'Harold', height : 160, gender : 'Male' }
         *  ]);
         *
         *  // Group on a the gender property and take the mean height.
         *  var genderGrouping = dataSet.group('gender', function(d) { return d.gender; })
         *                              .mean(['height']);
         *
         *  // The mean height by gender can now be included in a chart using the following value function
         *  var averageHeightValue = function(d) {
         *      return d.value.height.mean;
         *  };
         *
         * @example var dataSet = new insight.DataSet([
         *    { Forename : 'Alan', Interests : [ 'Triathlon', 'Music', 'Mountain Biking' ] },
         *    { Forename : 'Bob', Interests : [ 'Ballet', 'Music', 'Climbing' ] },
         *    { Forename : 'Mary', Interests : [ 'Triathlon', 'Music', 'Kayaking' ] }
         *  ]);
         *
         *  // Group on an array / one-to-many value, to aggregate the count of interests.
         *  var interestsGrouping = dataSet.group('Interests', function(d) { return d.Interests; }, true)
         *    .count(['Interests']);
         */
        self.group = function(name, groupFunction, oneToMany) {

            var arrayData = self.rawData();

            self.crossfilterData = self.crossfilterData || crossfilter(arrayData);

            var dim = new insight.Dimension(name, self.crossfilterData, groupFunction, oneToMany);

            var group = new insight.Grouping(dim);

            return group;
        };

    };

    insight.DataSet.prototype = Object.create(insight.DataProvider.prototype);
    insight.DataSet.prototype.constructor = insight.DataSet;

})(insight);
