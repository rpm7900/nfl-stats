var svg = d3.select(map.getPanes().overlayPane).append("svg");
var g = svg.append("g").attr("class", "leaflet-zoom-hide");

d3.json("points.geojson", function (collection) {
    // Do stuff here
});

var transform = d3.geo.transform({
    point: projectPoint
});
var d3path = d3.geo.path().projection(transform);

function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
} 
    });

map.on("viewreset", reset);

// this puts stuff on the map! 
reset();

function reset() {
    var bounds = d3path.bounds(collection),
        topLeft = bounds[0],
        bottomRight = bounds[1];


    begend.attr("transform",
        function (d) {
            return "translate(" +
                applyLatLngToLayer(d).x + "," +
                applyLatLngToLayer(d).y + ")";
        });

    //...do same thing to text, ptFeatures and marker...

});

svg.attr("width", bottomRight[0] - topLeft[0] + 120)
    .attr("height", bottomRight[1] - topLeft[1] + 120)
    .style("left", topLeft[0] - 50 + "px")
    .style("top", topLeft[1] - 50 + "px");


linePath.attr("d", toLine)
g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");


} // end reset