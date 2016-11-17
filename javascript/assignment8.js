const points = [
    [0, 5],
    [1, 9],
    [2, 7],
    [3, 5],
    [4, 3],
    [6, 4],
    [7, 2],
    [8, 3],
    [9, 2]
];

const sinLinePoints = [...new Array(10)].map((d, i) => [i, i]);

const INCREMENTER = 5,
    RADIUS_OF_CIRCLE = 3.5;

var decoratedXScale = ([x, y]) => xScale(x);
var decoratedYScale = ([x, y]) => yScale(y);
var decoratedSineScale = ([x, y]) => yScale(modifier(x));

var decorateLine = function(line, values, xScale, yScale) {
    return line.selectAll('circle')
        .data(values)
        .enter()
        .append('circle')
        .attr('r', RADIUS_OF_CIRCLE)
        .attr('cx', xScale)
        .attr('cy', yScale);
};

window.onload = function() {
    var chartArea = createGraph();

    var line1 = loadLineChart(chartArea, points, simpleLine);
    var line2 = loadLineChart(chartArea, points, sinLine);

    decorateLine(line1, points, decoratedXScale, decoratedYScale);
    decorateLine(line2, points, decoratedXScale, decoratedSineScale);
};
