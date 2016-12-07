window.onload = function() {
    d3.json('/files.json', function(err, data) {
        var container = d3.select('.container');
        var divs = container.selectAll('iframe')
            .data(data)
            .enter()
            .append('div')
            .classed('frame', true);

        divs.append('iframe')
            .attr('src', (d) => `./${d}.html`)
            .attr('height', 300)
            .attr('width', 500);

        divs.append('a')
            .text((d) => d)
            .attr("href", (d) => `./${d}.html`)
    });
}
