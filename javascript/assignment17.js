var values = [1, 1, 2, 2, 1, 2, 1];

var color = (d, i) => d3.schemeCategory20[i];

var pie = d3.pie().sort(null)
    .value((d) => d)
    .endAngle(() => Math.PI);

var appendGAndTranslate = function(svg) {
    return svg.append("g").attr("transform", Translate(WIDTH / 2, HEIGHT / 2));
};

window.onload = function() {
    var selection = d3.select('.container');
    var svg = appendGAndTranslate(createSvg(selection))
    var innerRadius = Math.min(HEIGHT, WIDTH) / 4;
    var outerRadius = Math.min(HEIGHT, WIDTH) / 2;

    drawPieChart(svg, values, {
        innerRadius,
        outerRadius,
        pie,
        color
    });
};
