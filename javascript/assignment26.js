const points = [...new Array(11)].map((d, i) => [i, Math.round(Math.random() * 10)]);
const sinLinePoints = [...new Array(11)].map((d, i) => [i, Math.round(Math.random() * 10)]);


const INCREMENTER = 5,
    RADIUS_OF_CIRCLE = 4.5;

var straightLineDetails = {
    'xRefiner': decoratedXScale,
    'yRefiner': decoratedYScale,
    'curve': d3.curveLinear,
    'color': d3.schemeCategory10[0],
    'fillColour': d3.schemeCategory10[0],
    'fillColourOpacity': .2
};

var sineLineDetails = {
    'xRefiner': decoratedXScale,
    'yRefiner': decoratedYScale,
    'curve': d3.curveLinear,
    'color': d3.schemeCategory10[1],
    'fillColour': d3.schemeCategory10[1],
    'fillColourOpacity': .2
};

var gridProperties = {
    stroke: 'black',
    opacity: .2
};

var ticker = (d) => d;

window.onload = function() {
    var container = d3.select('.container');
    var chartArea = createGraph(container, ticker, gridProperties);

    chainOperations(chartArea, points, straightLineDetails);
    chainOperations(chartArea, sinLinePoints, sineLineDetails);
};

var chainOperations = function(...args) {
    var operations = [drawAreaChart, drawAndDecorateLine];
    operations.forEach(function(operation) {
        operation.apply(null, args)
    });
};
