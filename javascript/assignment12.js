const startTension = -2,
    DIFFERENCE = 0.6,
    LIMIT = 5;

const sinLinePoints = [...new Array(10)].map((d, i) => [i, i]);

const INCREMENTER = 5,
    RADIUS_OF_CIRCLE = 3.5;

var swamijiFormula = function(number) {
    return (3 * Math.sin(number)) + 5;
};

var decoratedMiscScale = function([x, y]) {
    return yScale(swamijiFormula(x));
};

window.onload = function() {
    var container = d3.select('.container');

    var lineDetails = {
        'xRefiner': decoratedXScale,
        'yRefiner': decoratedMiscScale,
        'curve': d3.curveLinear,
        'color': 'steelblue',
        'fillColour': 'lightsteelblue'
    };

    var chartArea = createGraph(container);
    drawAreaChart(chartArea, sinLinePoints, lineDetails);
    drawLineChart(chartArea, sinLinePoints, lineDetails);
    drawScatterChart(chartArea, sinLinePoints, lineDetails);
};
