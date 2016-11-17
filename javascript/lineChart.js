const WIDTH = 500,
    HEIGHT = 500,
    MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN,
    INNER_HEIGHT = HEIGHT - 2 * MARGIN;

const DEFAULT_Y_RANGE = DEFAULT_X_RANGE = [0, 10];

const TICKS_ON_X_AXIS = TICKS_ON_Y_AXIS = 10;

const Translate = (x, y) => "translate(" + x + (y ? "," + y : "") + ")";

var xScale = d3.scaleLinear()
    .domain(DEFAULT_X_RANGE)
    .range([0, INNER_WIDTH]);

var yScale = d3.scaleLinear()
    .domain(DEFAULT_Y_RANGE)
    .range([INNER_HEIGHT, 0]);

var createAxis = function(svg, axis, [x, y]) {
    svg.append('g')
        .attr('transform', Translate(x, y))
        .call(axis);
};

var drawAxis = function(svg) {
    var xAxis = d3.axisBottom(xScale).ticks(TICKS_ON_X_AXIS).tickFormat(tickFormatter);
    createAxis(svg, xAxis, [MARGIN, HEIGHT - MARGIN]);

    var yAxis = d3.axisLeft(yScale).ticks(TICKS_ON_Y_AXIS).tickFormat(tickFormatter);
    createAxis(svg, yAxis, [MARGIN, MARGIN]);

    return svg;
};

var simpleLine = d3.line()
    .x(([x, y]) => xScale(x))
    .y(([x, y]) => yScale(y));

var sinLine = d3.line()
    .x(([x, y]) => xScale(x))
    .y(([x, y]) => yScale(modifier(x)));

var createGraph = function() {
    svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    drawAxis(svg)

    return svg.append('g')
        .attr('transform', Translate(MARGIN, MARGIN));
};

var loadLineChart = function(drawArea, values, refiner) {
    var g = drawArea.append('g');
    g.append('path')
        .classed('values line', true)
        .attr('d', refiner(values))

    return g;
};

var modifier = function(number) {
    return Math.sin(number) + INCREMENTER;
};

var tickFormatter = function(tickValue) {
    return (tickValue / 10).toFixed(1);
};
