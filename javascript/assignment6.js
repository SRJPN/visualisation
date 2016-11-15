const BOX_SIZE = 100,
    CIRCLE_RADIUS = 50,
    MARGIN = 50,
    UPPER_MARGIN = 20,
    DURATION = 2000,
    SQUARE_BORDER_RADIUS = 10;


var lineDetails = {
    attr: {
        x1: 0,
        y1: BOX_SIZE,
        x2: BOX_SIZE,
        y2: 0,
    },
    style: {
        stroke: 'grey'
    }
};

var circleDetails = {
    attr: {
        cx: CIRCLE_RADIUS,
        cy: CIRCLE_RADIUS,
        r: CIRCLE_RADIUS
    },
    style: {
        stroke: 'red'
    }
};

var squareDetails = {
    attr: {
        width: BOX_SIZE,
        height: BOX_SIZE,
        rx: SQUARE_BORDER_RADIUS,
        ry: SQUARE_BORDER_RADIUS
    },
    style: {
        stroke: 'steelblue'
    }
};

var triangleDetails = {
    attr: {
        points: [
            [0, BOX_SIZE],
            [BOX_SIZE / 2, 0],
            [BOX_SIZE, BOX_SIZE]
        ].join(" ")
    },
    style: {
        stroke: 'green',
    }
}


var drawShape = function(svg, shapeName, details) {
    var shape = svg.append(shapeName)
        .classed('shape', true);
    Object.keys(details).forEach((detail) => applyProperty(shape, detail, details[detail]));
    return shape;
};

var applyProperty = function(shape, prop, values) {
    Object.keys(values).forEach((attr) => shape[prop](attr, values[attr]));
};

var createDrawArea = function() {
    var drawArea = d3.select('.container')
        .append('svg')
        .classed('drawArea', true)
        .attr('width', '100%')
    return drawArea;
};

window.onload = function() {
    var drawArea = createDrawArea();
    var shapes = [lineDetails, circleDetails, squareDetails, triangleDetails];
    var shapeNames = ['line', 'circle', 'rect', 'polygon']
    shapes.forEach(function(shapeDetail, index) {
        var shape = drawShape(drawArea, shapeNames[index], shapeDetail);
        tranform(shape, index);
    });
};

var tranform = function(shape, index) {
    shape
    // .transition()
    // .duration(DURATION)
        .attr("transform", `translate( ${index * (BOX_SIZE + MARGIN)},${UPPER_MARGIN})`)
};
