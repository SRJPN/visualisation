const points = [...new Array(11)].map((d, i) => [i, Math.round(Math.random() * 10)]);
const sinLinePoints = [...new Array(11)].map((d, i) => [i, Math.round(Math.random() * 10)]);


const INCREMENTER = 5,
    RADIUS_OF_CIRCLE = 4.5;

var straightLineDetails = {
    'xRefiner': decoratedXScale,
    'yRefiner': decoratedYScale,
    'curve': d3.curveLinear,
    'color': d3.schemeCategory10[0]
};

var sineLineDetails = {
    'xRefiner': decoratedXScale,
    'yRefiner': decoratedYScale,
    'curve': d3.curveLinear,
    'color': d3.schemeCategory10[1],
};

var gridProperties = {
    stroke: 'black',
    opacity: .2
};

var ticker = (d) => d;

window.onload = function() {
    var container = d3.select('.container');
    var chartArea = createGraph(container, ticker, gridProperties);

    drawAndDecorateLine(chartArea, points, straightLineDetails);
    drawAndDecorateLine(chartArea, sinLinePoints, sineLineDetails);
};
