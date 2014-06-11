function DataSet(data) {

    this._data = data;

    this._orderFunction = function(a, b) {
        return b.value - a.value;
    };

    this._filterFunction = null;
}


DataSet.prototype.initialize = function() {

};

DataSet.prototype.filterFunction = function(f) {
    if (!arguments.length) {
        return this._filterFunction;
    }
    this._filterFunction = f;
    return this;
};

DataSet.prototype.getData = function() {
    var data;
    if (this._data.all) {
        data = this._data.all();
    } else {
        //not a crossfilter set
        data = this._data;
    }

    if (this._filterFunction) {
        data = data.filter(this._filterFunction);
    }

    return data;
};

DataSet.prototype.orderFunction = function(o) {
    if (!arguments.length) {
        return this._orderFunction;
    }
    this._orderFunction = o;
    return this;
};

DataSet.prototype.filterFunction = function(f) {
    if (!arguments.length) {
        return this._filterFunction;
    }
    this._filterFunction = f;
    return this;
};


DataSet.prototype.getOrderedData = function() {
    var data;

    data = this._data.sort(this._orderFunction);

    if (this._filterFunction) {
        data = data.filter(this._filterFunction);
    }

    return data;
};
