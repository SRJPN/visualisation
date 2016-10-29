var random, getValues;
var init = function(limit, maxValue) {
    var values;
    random = function() {
        var randomNumber = Math.ceil(Math.random() * maxValue);
        return [Date.now() + randomNumber, randomNumber];
    }
    values = initializeValues(limit);
    repeater(function() {
        values.push(random());
        values.shift();
    });
    getValues = function() {
        return JSON.parse(JSON.stringify(values))
    };
};

var initializeValues = function(limit) {
    return [...new Array(limit)].map(() => random())
};

var repeater = (func, values) => setInterval(() => func(getValues()), TIME_DELAY);
