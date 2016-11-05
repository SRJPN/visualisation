const LIMIT = 10;

var generateValues = function(limit) {
    return [...new Array(10)].map((d, i) => i + 1);
};

var rows = [{
    name: 'n',
    formula: (n) => n
}, {
    name: 'n square',
    formula: (n) => n * n
}, {
    name: 'log(n)',
    formula: (n) => Math.log(n) / Math.log(10)
}, {
    name: 'log(n) rounded',
    formula: (n) => Math.round(Math.log(n))
}]


var tabulate = function(heading, rows_values, values) {
    var table = d3.select('.container').append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody');

    table.attr('class', 'table-bordered')
        .style('text-align', 'center');

    thead.append('tr')
        .selectAll('th')
        .data(heading).enter()
        .append('th')
        .style('width', '130px')
        .style('text-align', 'center')
        .text(function(heading) {
            return heading;
        });

    var rows = tbody.selectAll('tr')
        .data(rows_values)
        .enter()
        .append('tr');

    var cells = rows.selectAll('td')
        .data(function(row) {
            var rowInput = values.map(function(value) {
                return row['formula'](value).toFixed(2)
            });
            rowInput.unshift(row.name);
            return rowInput
        })
        .enter()
        .append('td')
        .text(function(d) {
            return d;
        });
};

window.onload = function() {
    var heading = generateValues(LIMIT)
    heading.unshift('Title');

    values = generateValues(LIMIT)

    tabulate(heading, rows, values);
}
