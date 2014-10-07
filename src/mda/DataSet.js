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
         *    { Forename : 'Alan', Height : 133, Country : 'England' },
         *    { Forename : 'Bob', Height : 169, Country : 'Scotland' },
         *    { Forename : 'Mary', Height : 151, Country : 'Northern Ireland' }
         *  ]):
         *
         *  // Group on a single / one-to-one value, to aggregate the average height.
         *  var countryGrouping = dataSet.group('Country', function(d) { return d.Country; })
         *    .mean(['Height']);
         * @example var dataSet = new insight.DataSet([
         *    { Forename : 'Alan', Interests : [ 'Triathlon', 'Music', 'Mountain Biking' ] },
         *    { Forename : 'Bob', Interests : [ 'Ballet', 'Music', 'Climbing' ] },
         *    { Forename : 'Mary', Interests : [ 'Triathlon', 'Music', 'Kayaking' ] }
         *  ]):
         *
         *  // Group on an array / one-to-many value, to aggregate the count of interests.
         *  var interestsGrouping = dataSet.group('Interests', function(d) { return d.Interests; }, true)
         *    .count('Interests');
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
