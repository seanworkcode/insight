/*
 * An internal module containing helper functions used throughout the library
 */
insight.utils = (function() {

    var exports = {};

    // Private functions -----------------------------------------------------------------------------------------

    /*
     * This recursive function takes two values a and b, a list of sort objects [{sortFunction: function(a){return a.valueToSortOn;}, order: 'ASC'}] and an index of the current function being used to sort.
     * It returns a ordering value for a and b, as per the normal Javascript sorting rules https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
     * @memberof! insight.utils
     * @returns {Integer} sortResult - if a > b then the result = 1, -1 if a < b and 0 if a == b.
     * @param {Object} a - Description
     * @param {Object} b - Description
     * @param {Object[]} sorters - A list of sorting rules [{sortFunction: function(a){return a.valueToSortOn;}, order: 'ASC'}]
     */
    function recursiveSort(a, b, sorters) {
        if (sorters.length === 0) {
            return 0;
        }

        var current = sorters[0];
        var sortParameter = current.sortParameter;
        var sortOrder = current.order;

        var aResult = sortParameter(a),
            bResult = sortParameter(b);

        if (aResult === bResult) {
            return recursiveSort(a, b, sorters.slice(1));
        }

        var sortResult = (aResult > bResult) ? 1 : -1;
        return (sortOrder === 'ASC') ? sortResult : -sortResult;
    }

    // Internal functions -------------------------------------------------------------------------------------------

    /*
     * Checks if an object is an array or not
     * @returns {Boolean} return - is the object an array
     * @param {Object} input - The object to check
     */
    exports.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /*
     * Checks if an object is an function or not
     * @returns {Boolean} return - is the object a function
     * @param {Object} input - The object to check
     */
    exports.isFunction = function(obj) {
        return obj instanceof Function;
    };

    /*
     * Builds the CSS selector used to return chart items that are not selected (and not axes)
     * @returns {String} cssSelector - CSS selector for unselected chart items
     */
    exports.highlightSelector = function() {

        var notSelected = ':not(.selected)';
        var selector = '.' + insight.constants.BarClass + notSelected +
            ',.' + insight.constants.Bubble + notSelected;

        return selector;
    };

    exports.isDate = function(obj) {
        return obj instanceof Date;
    };

    exports.isNumber = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Number]';
    };

    /*
     * Returns true/false if an object is inside an array.
     * @memberof! insight.utils
     * @param {Object[]} array - The array to check
     * @param {Object} value - The value to check for
     * @returns {Boolean} - True if the provided array contains the provided value
     */
    exports.arrayContains = function(array, value) {
        return array.indexOf(value) !== -1;
    };

    /*
     * Checks if the two arrays are identical
     * @memberof! insight.utils
     * @param {Object[]} baseArray The first array to compare for equality
     * @param {Object} compareArray The second array to compare for equality
     * @returns {Boolean} - True if the arrays contain the same objects.
     */
    exports.arrayEquals = function(baseArray, compareArray) {
        if (baseArray.length !== compareArray.length) {
            return false;
        }

        for (var i = 0; i < baseArray.length; i++) {
            if (baseArray[i].valueOf() !== compareArray[i].valueOf()) {
                return false;
            }
        }

        return true;
    };

    /*
     * Adds a value to an array, only if it doesn't already belong to the array.
     * @memberof! insight.utils
     * @param {Object[]} array - The array to insert into
     * @param {Object} value - The value to insert
     */
    exports.addToSet = function(array, value) {
        if (!exports.arrayContains(array, value)) {
            array.push(value);
        }
    };

    /**
     * Takes a data point, and creates a class name for insight to identify this particular key
     * If the parameter is not an object (just a value in an array) then there is no need for this particular
     * class so an empty string is returned.
     * @returns {String} return - A class name to identify this point and any other points taking the same value in other charts.
     * @param {Object} d - The input point
     */
    exports.keySelector = function(d) {

        var result = '';

        if (d) {
            var str = d.toString();
            result = 'in_' + exports.alphaNumericString(str);
        }

        return result;
    };

    /**
     * Takes a string, and replaces all non-alphanumeric characters with underscores.
     * @memberof! insight.utils
     * @param {String} string The string to strip non-alphanumeric characters from.
     * @returns {String} - The stripped version of the input string.
     */
    exports.alphaNumericString = function(string) {
        return string.replace(/[^A-Z0-9]/ig, '_');
    };

    /**
     * Returns the elements in the provided array where the given parameter matches a specific value
     * @param {Object[]} array - The input array to check
     * @param {String} propertyName - The name of the property to match
     * @param {String} value - The value to match
     * @returns {Object[]} - The matching elements
     */
    exports.takeWhere = function(array, propertyName, value) {
        var matches = array.filter(function(item) {
            if (item.hasOwnProperty(propertyName)) {
                return item[propertyName] === value;
            } else {
                return false;
            }
        });

        return matches;
    };

    /**
     * Removes the elements in the provided array where the given parameter matches a specific value
     * @param {Object[]} array - The input array to check
     * @param {String} propertyName - The name of the property to match
     * @param {String} value - The value to match
     * @returns {Object[]} - The matching elements
     */
    exports.removeWhere = function(array, propertyName, value) {

        var self = this;
        var matches = exports.takeWhere(array, propertyName, value);

        matches.forEach(function(match) {
            self.removeItemFromArray(array, match);
        });
    };

    exports.removeItemFromArray = function(array, item) {
        var index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }
    };

    exports.arrayUnique = function(array) {
        var a = array.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j]) {
                    a.splice(j--, 1);
                }
            }
        }

        return a;
    };

    /*
     * Returns the last element in an array
     * @param {Array} Any array
     * @returns The last element in the array or undefined if the array is empty or the parameter is not an array
     */
    exports.lastElement = function(array) {

        if (!insight.utils.isArray(array) || array.length === 0) {
            return undefined;
        }

        return array.slice(array.length - 1)[0];
    };

    /**
     * Takes two objects and returns the union, with priority given to the first parameter in the event of clashes.
     * This bias is used for scenarios where user defined CSS properties must not override default values.
     * @returns {Object} union - a shallow copy representing the union between the provided objects
     * @param {Object} base - The base object to have priority in the union operation.
     * @param {Object} extend - The object to extend from, adding any additional properties and values defined in this parameter.
     */
    exports.objectUnion = function(base, extend) {
        var merged = {},
            key = null;

        for (key in extend) {
            merged[key] = extend[key];
        }
        for (key in base) {
            merged[key] = base[key];
        }
        return merged;
    };

    /**
     * Takes an array and a list of sort objects, sorting the array (in place) using the provided priorities and returning that array at the end.
     * @returns {Object[]} sortedArray - The sorted array
     * @param {Object[]} data - The array to sort.  It will be sorted in place (as per Javascript sort standard behaviour) and returned at the end.
     * @param {Object[]} sorters - A list of sorting rules [{sortFunction: function(a){return a.valueToSortOn;}, order: 'ASC'}]
     */
    exports.multiSort = function(array, sorters) {
        if (!sorters.length) {
            return array;
        }

        // create a comparison function that takes two values, and tries to sort them according to the provided sorting functions and orders.
        // the sorting functions will be recursively tested if the values a and b are equal until an ordering is established or all or the sorter list is exhausted.
        function sortFunction(a, b) {
            var result = recursiveSort(a, b, sorters, 0);
            return result;
        }

        return array.sort(sortFunction);
    };

    /**
     * Takes a SVG element and returns a bounding box of coordinates at each of its compass points
     * @returns {Object} return - A bounding box object {nw: ..., n: ..., ne: ..., e: ..., se: ..., s: ..., sw: ..., w: ...}
     * @param {DOMElement} element - The element to measure
     */
    exports.getSVGBoundingBox = function(element) {

        var point = element.ownerSVGElement.createSVGPoint();

        var bbox = {},
            matrix = element.getCTM(),
            tbbox = element.getBBox(),
            width = tbbox.width,
            height = tbbox.height,
            x = tbbox.x,
            y = tbbox.y;

        point.x = x;
        point.y = y;
        bbox.nw = point.matrixTransform(matrix);
        point.x += width;
        bbox.ne = point.matrixTransform(matrix);
        point.y += height;
        bbox.se = point.matrixTransform(matrix);
        point.x -= width;
        bbox.sw = point.matrixTransform(matrix);
        point.y -= height / 2;
        bbox.w = point.matrixTransform(matrix);
        point.x += width;
        bbox.e = point.matrixTransform(matrix);
        point.x -= width / 2;
        point.y -= height / 2;
        bbox.n = point.matrixTransform(matrix);
        point.y += height;
        bbox.s = point.matrixTransform(matrix);

        return bbox;
    };

    exports.valueForKey = function(dictionary, key, keyFunction, valueFunction) {
        var values = dictionary.filter(function(item) {
            return keyFunction(item) === key;
        });
        return valueFunction(values[0]);
    };

    exports.safeString = function(input) {
        return input.split(' ').join('_');
    };

    exports.tryParseInt = function(str, defaultValue) {
        var retValue = defaultValue;
        if (str != null) {
            if ((str.length > 0) && !isNaN(str)) {

                retValue = parseInt(str);
            }
        }
        return retValue;
    };

    exports.getNativeComputedStyle = function(element) {
        return window.getComputedStyle(element);
    };

    // Helper functions for text measurement.
    // Mock out in tests to remove dependency on window and DOM functions

    exports.getElementStyles = function(textElement, styleProperties) {

        var style = exports.getNativeComputedStyle(textElement);
        var properties = {};

        styleProperties.forEach(function(propertyName) {
            properties[propertyName] = style.getPropertyValue(propertyName);
        });

        return properties;
    };

    exports.getDrawingContext = function(canvas, font) {

        var ctx = canvas.getContext('2d');
        ctx.font = font;

        return ctx;
    };

    exports.fontSizeFromFont = function(font) {

        var defaultSize = 12;
        if (!font) {
            return defaultSize;
        }

        var fontComponents = font.split(' ');

        for (var i = 0; i < fontComponents.length; i++) {
            var parsed = parseInt(fontComponents[i]);

            if (!isNaN(parsed)) {
                return parsed;
            }
        }

        return defaultSize;

    };

    exports.degreesToRadians = function(degrees) {
        return degrees * Math.PI / 180;
    };

    return exports;

}());
