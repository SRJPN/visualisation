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

var data;

var xScale = d3.scaleLinear()
    .domain(DEFAULT_RANGE)
    .range([0, INNER_WIDTH]);

var colourScale = d3.scaleOrdinal(d3.schemeCategory10);

var createChart = function(scores) {
    var bars = d3.select('.container')
        .selectAll('.bar')
        .data(scores, (d) => d.name + d.subject);

    bars.enter()
        .append('div')
        .attr("class", "bar")
        .style("width", (d) => xScale(d.score) + 'px')
        .style('background-color', (d) => colourScale(d.subject))
        .text((d) => d.name + " " + d.score)

    var subjects = scores.map((s) => s.subject).filter(function(x, i, a) {
        return a.indexOf(x) == i;
    });

    var sortButtons = d3.select('.sort')
        .selectAll('sort')
        .data(['Name', 'Subject', 'Score']);

    sortButtons.enter()
        .append('button')
        .attr('class', 'sort')
        .on('click', (sortType) => {
            d3.selectAll('.bar').sort((a, b) => d3.ascending(a[sortType.toLowerCase()], b[sortType.toLowerCase()]))
        })
        .text((d) => d);

    var subjects = d3.select('.legend')
        .selectAll('subject')
        .data(subjects);

    subjects.enter()
        .append('span')
        .attr("class", "subject")
        .style('background-color', colourScale)
        .text((d) => d)

    bars.exit().remove();
};


window.onload = function() {
    d3.json('data/marks.json', function(somthing) {
        data = somthing
        createChart(data);
    });
};
