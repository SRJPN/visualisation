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

window.onload = function() {
    var chartArea = createGraph();
    loadLineChart(chartArea, points, simpleLine);
    loadLineChart(chartArea, sinLinePoints, sinLine)
};
