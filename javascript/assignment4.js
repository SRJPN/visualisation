const LIMIT = 10,
    TABLE_CLASS = 'table-bordered',
    CELL_WIDTH = '130px',
    HEADING = 'Title';

const ROW_TITLES = [{
    name: 'n',
    formula: d3.scaleLinear()
}, {
    name: 'n square',
    formula: d3.scalePow().exponent(2)
}, {
    name: 'log(n)',
    formula: (d) => logScale(d).toFixed(2)
}, {
    name: 'log(n) rounded',
    formula: d3.scaleLog().rangeRound([0, 1])
}];

var table, logScale = d3.scaleLog();

var generateValues = function(limit) {
    return [...new Array(limit)].map((d, i) => i + 1);
};

var self = (thing) => thing;

var valuesMapper = function(values) {
    return (action) => [action.name].concat(values.map((value) => action['formula'](value)));
};

var generateTableHead = function(heading, values) {
    var heading_row = [heading].concat(values);

    var thead = table.append('thead');

    thead.append('tr')
        .selectAll('th')
        .data(heading_row)
        .enter()
        .append('th')
        .style('width', CELL_WIDTH)
        .style('text-align', 'center')
        .text(self);

    return thead;
};

var generateTableBody = function(titles, values) {
    var tbody = table.append('tbody');

    var rows = tbody.selectAll('tr')
        .data(titles)
        .enter()
        .append('tr');

    var cells = rows.selectAll('td')
        .data(valuesMapper(values))
        .enter()
        .append('td')
        .text(self);

    return cells;
};

var genrateTable = function() {
    table = d3.select('.container').append('table')

    table.attr('class', TABLE_CLASS)
        .style('text-align', 'center');
};

window.onload = function() {
    var values = generateValues(LIMIT)
    genrateTable();
    generateTableHead(HEADING, values);
    generateTableBody(ROW_TITLES, values);
};
