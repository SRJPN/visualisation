const sinLinePoints = [...new Array(10)].map((d, i) => [i, i]);

const INCREMENTER = 5,
    RADIUS_OF_CIRCLE = 3.5;

var scale = d3.scaleLinear()
    .domain([0, 1])
    .range([INNER_HEIGHT, 0]);

var decoratedMiscScale = function([x, y]) {
    return scale(swamijiFormula(x));
};

var swamijiFormula = function(number) {
    return (Math.sin(3 * number) + 1) / 2
};

var lineDetails = {
    'xRefiner': decoratedXScale,
    'yRefiner': decoratedMiscScale,
    'curve': d3.curveLinear,
    'color': 'steelblue'
};

window.onload = function() {
    var container = d3.select('.container');

    var chartArea = createGraph(container);

    drawAndDecorateLine(chartArea, sinLinePoints, lineDetails);
};
