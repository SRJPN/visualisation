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

const INCREMENTER = 5;

var straightLineDetails = {
    'xRefiner': decoratedXScale,
    'yRefiner': decoratedYScale,
    'curve': d3.curveLinear,
    'color': 'steelblue'
};

var sineLineDetails = {
    'xRefiner': decoratedXScale,
    'yRefiner': decoratedSineScale,
    'curve': d3.curveLinear,
    'color': 'steelblue'
};

window.onload = function() {
    var container = d3.select('.container');
    var chartArea = createGraph(container);

    loadLineChart(chartArea, points, straightLineDetails);
    loadLineChart(chartArea, points, sineLineDetails);
};
