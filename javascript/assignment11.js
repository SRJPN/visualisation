const startTension = -2,
    DIFFERENCE = 0.6,
    LIMIT = 5;

const sinLinePoints = [...new Array(10)].map((d, i) => [i, i]);

var tensionScale = d3.scaleLinear()
    .domain([0, 4])
    .range([-2, 1]);

const INCREMENTER = 5,
    RADIUS_OF_CIRCLE = 3.5;

var decoratedMiscScale = function([x, y]) {
    var scale = d3.scaleLinear()
        .domain([0, 1])
        .range([INNER_HEIGHT, 0]);
    return scale(swamijiFormula(x));
};

var swamijiFormula = function(number) {
    return (Math.sin(3 * number) + 1) / 2
};

window.onload = function() {
    var container = d3.select('.container');
    for (i = 0; i < 5; i++) {
        var lineDetails = {
            'xRefiner': decoratedXScale,
            'yRefiner': decoratedMiscScale,
            'curve': d3.curveCardinal.tension(tensionScale(i)),
            'color': 'steelblue'
        };
        var chartArea = createGraph(container);

        drawAndDecorateLine(chartArea, sinLinePoints, lineDetails);
    }
};
