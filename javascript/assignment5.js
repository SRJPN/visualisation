const LIMIT = 10;
const WIDTH_RANGE = [12, 120];
const HEIGHT_RANGE = [30, 180];

var widthScale = d3.scaleLinear()
    .domain([0, LIMIT])
    .range(WIDTH_RANGE);

var heightScale = d3.scaleLinear()
    .domain([0, LIMIT])
    .range(HEIGHT_RANGE)

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
        .style('font', generateFontString)
        .text((d) => d)
};

var generateFontString = function(number) {
    return ['italic bold ', widthScale(number), 'px/', heightScale(number), 'px Georgia sans-serif'].join('');
};

window.onload = function() {
    var values = generateValues(LIMIT)
    generateBoxes(values)
}
