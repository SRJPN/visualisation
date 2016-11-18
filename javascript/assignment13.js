const startTension = -2,
    DIFFERENCE = 0.6,
    LIMIT = 5;

const sinLinePoints = [...new Array(11)].map((d, i) => [i, i]);

const INCREMENTER = 5,
    RADIUS_OF_CIRCLE = 3.5;

var swamijiFormula = function(number) {
    return (3 * Math.sin(number)) + 5;
};

var decoratedMiscScale = function([x, y]) {
    return yScale(swamijiFormula(x));
};

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
        var lineDetails = {
            'xRefiner': decoratedXScale,
            'yRefiner': decoratedMiscScale,
            'curve': curve.d3Curve,
            'color': 'steelblue',
            'fillColour': 'lightsteelblue'
        };

        var chartArea = createGraph(container);
        drawAreaChart(chartArea, sinLinePoints, lineDetails);
        drawLineChart(chartArea, sinLinePoints, lineDetails);
        drawScatterChart(chartArea, sinLinePoints, lineDetails);
    });
};
