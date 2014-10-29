/**
 * Conversion functions with a focus on JSON format
 * @namespace insight.conversion
 */
insight.conversion = (function() {

    function getValue(type, value) {
        var returnValue = value;
        try {
            if (type.toUpperCase() === 'NUMERIC' || type.toUpperCase() === 'INTEGER') {
                returnValue = parseInt(value, 10);
            }
            if (type.toUpperCase() === 'REAL') {
                returnValue = parseFloat(value);
            }
            if (type.toUpperCase() === 'STRING') {
                returnValue = value;
            }
        } catch (err) {
            console.error('error parsing type in arff to json conversion', err);
        }
        return returnValue;
    }

    return {

        /** Convert arff data into JSON data
         * @memberof! insight.conversion
         * @param {Object} data The data to be converted.
         * @returns {Object} - The converted data.
         */
        arffToJson: function(data) {

            var jdata = [];
            var lines = data.replace(/\t/g, ' ').replace(/\'/g, '').split(/\r?\n|\r/g).filter(function(line) {
                return line.length >= 1 && line[0] !== "";
            });

            var attributes = [];

            var currentState;

            var states = {
                relation: function(string) {
                    if (string.match(/\@relation/i)) {
                        jdata.title = string.split(' ')[1];
                        currentState = states.attribute;
                    }
                },
                attribute: function(string) {
                    if (string.match(/\@attribute/i)) {
                        var elements = string.split(/ +/);
                        attributes.push({
                            name: elements[1],
                            type: elements[2]
                        });
                    }
                    if (string.match(/\@data/i)) {
                        console.log('Parsed attributes were ', attributes);
                        currentState = states.data;
                    }
                },
                data: function(string) {
                    var values = string.split(',');
                    if (values.length !== attributes.length) {
                        throw 'data missing, not enough values to fill expected attributes';
                    }
                    var item = {};
                    attributes.forEach(function(attr, index) {
                        item[attr.name] = getValue(attr.type, values[index]);
                    });
                    jdata.push(item);
                }
            };

            currentState = states.relation;

            lines.forEach(function(line) {
                try {
                    currentState(line);
                } catch (err) {
                    console.error('failed to convert a line in arff to json converter, skipping', err);
                }
            });

            return jdata;
        }

    };

}());
