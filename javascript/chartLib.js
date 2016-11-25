const WIDTH = 500,
    HEIGHT = 500,
    MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN,
    INNER_HEIGHT = HEIGHT - 2 * MARGIN;

const DEFAULT_Y_RANGE = DEFAULT_X_RANGE = [0, 10];

const TICKS_ON_X_AXIS = TICKS_ON_Y_AXIS = 10;

const Translate = (x, y) => `translate(${x}${y ? ','+y : ''})`;

//==========================================Scales==========================================

var xScale = d3.scaleLinear()
    .domain(DEFAULT_X_RANGE)
    .range([0, INNER_WIDTH]);

var yScale = d3.scaleLinear()
    .domain(DEFAULT_Y_RANGE)
    .range([INNER_HEIGHT, 0]);


var decoratedXScale = ([x, y]) => xScale(x);
var decoratedYScale = ([x, y]) => yScale(y);
var decoratedSineScale = ([x, y]) => yScale(modifier(x));

//==========================================Axis==========================================

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

//==========================================Graph==========================================

var createSvg = function(selection, obj) {
    var svg = selection.append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT)
        .style('display', 'block')
    return svg;
};

var createGraph = function(selection) {
    var svg = createSvg(selection);
    drawAxis(svg);

    return svg.append('g')
        .attr('transform', Translate(MARGIN, MARGIN));
};

//==========================================Line==========================================

var drawLineChart = function(drawArea, values, {
    xRefiner,
    yRefiner,
    curve,
    color,
    refiner,
    fillColour
}) {

    var line = d3.line()
        .x(xRefiner)
        .y(yRefiner)
        .curve(curve)

    var g = drawArea.append('g');

    drawPath(g, values, {
        refiner: line,
        color: color,
    });

    return g;
};

//==========================================Area==========================================

var drawAreaChart = function(drawArea, values, {
    xRefiner,
    yRefiner,
    curve,
    color,
    refiner,
    fillColour
}) {
    var area = d3.area()
        .x(xRefiner)
        .y0(INNER_HEIGHT)
        .y1(yRefiner)
        .curve(curve);

    var g = drawArea.append('g');

    drawPath(g, values, {
        refiner: area,
        fillColour: fillColour
    });

    return g;
};

//==========================================Scatter==========================================

var drawScatterChart = function(line, values, {
    xRefiner,
    yRefiner,
    color
}) {
    return line.selectAll('circle')
        .data(values)
        .enter()
        .append('circle')
        .attr('r', RADIUS_OF_CIRCLE)
        .attr('cx', xRefiner)
        .attr('cy', yRefiner)
        .attr('stroke-width', '2px')
        .attr('stroke', color)
        .attr('fill', 'white');
};

//==========================================Pie==========================================

var drawPieChart = function(svg, values, {
    innerRadius,
    outerRadius,
    pie,
    color
}) {

    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    var g = svg.selectAll('g')
        .data(pie(values))
        .enter()
        .append('g');

    g.append('path')
        .style('fill', color)
        .attr("d", arc);
};

//==========================================Path==========================================

var drawPath = function(g, values, {
    refiner,
    color,
    fillColour
}) {
    g.append("path")
        .data([values])
        .attr("class", "line")
        .attr("d", refiner)
        .attr('fill', 'none')
        .attr('stroke-width', '2px')
        .attr('stroke', color || 'none')
        .attr('fill', fillColour || 'none')
};

//==========================================Misc Functions==========================================

var modifier = function(number) {
    return Math.sin(number) + INCREMENTER;
};

var tickFormatter = function(tickValue) {
    return (tickValue / 10).toFixed(1);
};

var drawAndDecorateLine = function(chartArea, points, options) {
    var line = drawLineChart(chartArea, points, options);
    drawScatterChart(line, points, options)
};

var appendGAndTranslate = function(svg, transform) {
    return svg.append("g").attr("transform", Translate(transform.x, transform.y));
};
