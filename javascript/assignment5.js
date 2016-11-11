const LIMIT = 10;
const WIDTH_RANGE = [12, 120];
const HEIGHT_RANGE = [30, 180];

var generateFontString = function(x, y) {
    return ['italic bold ', x, 'px/', y, 'px Georgia'].join('');
};

var fontScale = d3.scaleLinear()
    .domain([0, LIMIT])
    .range([generateFontString(WIDTH_RANGE[0], HEIGHT_RANGE[0]), generateFontString(WIDTH_RANGE[1], HEIGHT_RANGE[1])])

var generateValues = function(limit) {
    return [...new Array(limit + 1)].map((d, i) => i);
};

var generateBoxes = function(values) {
    var boxes = d3.select('.container')
        .selectAll('box')
        .data(values);

    boxes.enter()
        .append('div')
        .classed('box', true)
        .style('font', fontScale)
        .text((d) => d)
};

window.onload = function() {
    var values = generateValues(LIMIT)
    generateBoxes(values)
};
