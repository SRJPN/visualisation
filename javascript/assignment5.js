const LIMIT = 10;
const WIDTH_RANGE = [12, 120];
const HEIGHT_RANGE = [30, 180];

var widthScale = d3.scaleLinear()
    .domain([1, LIMIT])
    .range(WIDTH_RANGE);

var heightScale = d3.scaleLinear()
    .domain([1, LIMIT])
    .range(HEIGHT_RANGE)

var generateValues = function(limit) {
    return [...new Array(limit)].map((d, i) => i + 1);
};

var generateBoxes = function(values) {
    var boxes = d3.select('.container')
        .selectAll('box')
        .data(values);

    boxes.enter()
        .append('div')
        .classed('box', true)
        .style('font', (d) => 'italic bold ' + widthScale(d) + 'px/' + heightScale(d) + 'px sans-serif')
        .text((d) => d)
}

window.onload = function() {
    var values = generateValues(LIMIT)
    generateBoxes(values)
}
