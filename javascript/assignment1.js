const WIDTH = 1200;
const HEIGHT = 800;
const MARGIN = 30;

const KEY = 0;
const VALUE = 1;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const NUMBER_OF_VALUES_ON_GRAPH = 10;
const MAX_VALUE = 100;
const DEFAULT_RANGE = [0, MAX_VALUE];

const TIME_DELAY = 1000;

const Translate = (x, y) => "translate(" + x + (y ? "," + y : "") + ")";

var xScale = d3.scaleLinear()
    .domain(DEFAULT_RANGE)
    .range([0, INNER_WIDTH]);

var colourScale = d3.scaleLinear()
    .domain(DEFAULT_RANGE)
    .range(['lightsteelblue', 'steelblue']);

var updateChart = function(values) {
    var bars = d3.select('.container')
        .selectAll('.bar')
        .data(values, (d) => d[KEY]);

    bars.enter()
        .append('div')
        .attr("class", "bar")
        .style("width", (d) => xScale(d[VALUE]) + 'px')
        // .attr("transform", Translate(xScale(1)))
        // .transition('none')
        // .duration(900)
        .style('background-color', (d) => colourScale(d[VALUE]))
        .text((d) => d[VALUE])

    bars.exit().remove();
};

window.onload = function() {
    init(NUMBER_OF_VALUES_ON_GRAPH, MAX_VALUE);
    updateChart(getValues());
    repeater(updateChart);
}
