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

var curveArray = [{
    "d3Curve": d3.curveLinear,
    "curveTitle": "curveLinear"
}, {
    "d3Curve": d3.curveLinearClosed,
    "curveTitle": "curveLinear"
}, {
    "d3Curve": d3.curveStep,
    "curveTitle": "curveStep"
}, {
    "d3Curve": d3.curveStepBefore,
    "curveTitle": "curveStepBefore"
}, {
    "d3Curve": d3.curveStepAfter,
    "curveTitle": "curveStepAfter"
}, {
    "d3Curve": d3.curveBasis,
    "curveTitle": "curveBasis"
}, {
    "d3Curve": d3.curveCardinal,
    "curveTitle": "curveCardinal"
}, {
    "d3Curve": d3.curveMonotoneX,
    "curveTitle": "curveMonotoneX"
}, {
    "d3Curve": d3.curveCatmullRom,
    "curveTitle": "curveCatmullRom"
}];

window.onload = function() {
    var container = d3.select('.container');

    curveArray.forEach(function(curve) {
        var sineLineDetails = {
            'xRefiner': decoratedXScale,
            'yRefiner': decoratedSineScale,
            'curve': curve.d3Curve,
            'color': 'brown',
            'refiner': sineLine
        };

        var chartArea = createGraph(container);

        drawAndDecorateLine(chartArea, points, straightLineDetails);
        drawAndDecorateLine(chartArea, sinLinePoints, sineLineDetails);
    })
};
