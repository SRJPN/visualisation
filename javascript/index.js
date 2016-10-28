const WIDTH = 1200;
const HEIGHT = 500;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

const NUMBER_OF_VALUES_ON_GRAPH = 10;

const DEFAULT_Y_RANGE = [0, 100];
const DEFAULT_X_RANGE = [0, NUMBER_OF_VALUES_ON_GRAPH];

const TICKS_ON_X_AXIS = 10
const TICKS_ON_Y_AXIS = TICKS_ON_X_AXIS


const TIME_DELAY = 250;

const Translate = (x, y) => "translate(" + x + (y ? "," + y : "") + ")";

var svg, line, xScale, yScale, active, g, values;

var createGraph = function() {
    svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    xScale = d3.scaleLinear()
        .domain(DEFAULT_X_RANGE)
        .range([0, INNER_WIDTH]);

    yScale = d3.scaleLinear()
        .domain(DEFAULT_Y_RANGE)
        .range([INNER_HEIGHT, 0]);

    var xAxis = d3.axisBottom(xScale).ticks(TICKS_ON_X_AXIS);
    var yAxis = d3.axisLeft(yScale).ticks(TICKS_ON_Y_AXIS);

    svg.append('g')
        .attr('transform', Translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis)
        .classed('xAxis', true);

    svg.selectAll('.xAxis .tick')
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', -INNER_HEIGHT)
        .classed('grid', true);

    svg.append('g')
        .attr('transform', Translate(MARGIN, MARGIN))
        .classed('yAxis', true)
        .call(yAxis);

    svg.selectAll('.yAxis .tick')
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', INNER_WIDTH)
        .attr('y2', 0)
        .classed('grid', true);

    line = d3.line()
        .x((q, i) => xScale(i))
        .y((q) => yScale(q))
        .curve(d3.curveMonotoneX);;

    g = svg.append('g')
        .attr('transform', Translate(MARGIN, MARGIN));
};

var updateLineChart = function(values) {
    quotes = refineQuotes(values);
    var svg = d3.select("svg");

    svg.select(".line")
        .attr("d", line(quotes))
        .attr("transform", Translate(xScale(1)))
        .transition()
        .duration(200)
        .attr("transform", Translate(xScale(0)))
};

var loadLineChart = function(values) {
    clearGraph();
    quotes = refineQuotes(values);
    g.append('path')
        .classed('values line', true)
        .attr('d', line(quotes));

    g.selectAll('path').exit().remove();
};

var loadBarChart = function(values) {
    clearGraph();
    quotes = refineQuotes(values);
    svg.selectAll('rect')
        .data(quotes)
        .enter().append('rect')
        .attr('x', (d, i) => xScale(i) + MARGIN)
        .attr('y', (d) => yScale(d) + MARGIN)
        .attr('width', () => xScale(1))
        .attr('height', (d) => INNER_HEIGHT - yScale(d))
        .classed('values bar', true);
    svg.selectAll('rect').exit().remove();
};

var updateBarChart = function(values) {
    quotes = refineQuotes(values);
    svg.selectAll('.bar')
        .data(quotes)
        .transition()
        .duration(0)
        .attr('x', (d, i) => xScale(i) + MARGIN)
        .attr('y', (d) => yScale(d) + MARGIN)
        .attr('width', () => xScale(1))
        .attr('height', (d) => INNER_HEIGHT - yScale(d));
};

var refineQuotes = function(quotes) {
    return quotes.slice(-NUMBER_OF_VALUES_ON_GRAPH);
};

var clearGraph = function() {
    svg.selectAll('rect').remove();
    svg.selectAll('path').remove();
};

var clearCircles = function() {
    svg.selectAll('circle').remove();
};

// =======================================================================================================================================
// Random Number generator

var init = function(range) {
    var values;
    random = () => Math.ceil(Math.random() * range[1]);
    values = initializeValues();
    repeater(function() {
        values.push(random());
        values.shift();
    });
    getValues = function() {
        return JSON.parse(JSON.stringify(values))
    };
};

var initializeValues = function() {
    return [...new Array(NUMBER_OF_VALUES_ON_GRAPH)].map(() => random())
};

// =======================================================================================================================================
// Toggler

var ring = function() {
    var index = 0;
    return function() {
        index = (index + 1) % 2
        return index;
    };
}();

var toggle = function() {
    var charts = [
        [loadLineChart, updateLineChart],
        [loadBarChart, updateBarChart]
    ];
    $('input[type="checkbox" i]').on('click', function() {
        var index = ring();
        clearInterval(active);
        clearCircles();
        charts[index][0](getValues())
        active = repeater(charts[index][1]);
    });
};

var repeater = (func, values) => setInterval(() => func(getValues()), TIME_DELAY);

window.onload = function() {
    createGraph();
    toggle();
    init(DEFAULT_Y_RANGE)
    loadLineChart(getValues());
    active = repeater(updateLineChart, getValues());
};
