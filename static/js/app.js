// // Establish size of chart and padding between bars
// var svgWidth = d3.select("#right-pane").style("width").slice(0, -2)
// var svgHeight = d3.select("#right-pane").style("height").slice(0, -2)

// console.log("Height", svgHeight, "Width", svgWidth)

// // var svgWidth = 400, svgHeight = 240
// var barPadding = 5;

// Grab the <svg> and set its height and width attributes
// var svg = d3.select("#right-pane").append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

function createBarGraph(team) {
  
  var svgWidth = d3.select("#right-pane").style("width").slice(0, -2);
  var svgHeight = d3.select("#right-pane").style("height").slice(0, -2);

  d3.select('#right-pane').selectAll("*").remove()
  var svg = d3.select("#right-pane")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
  
  // Establish size of chart and padding between bars

  console.log("Height", svgHeight, "Width", svgWidth)

  // var svgWidth = 400, svgHeight = 240
  var barPadding = 5;

  // var svg = d3.select("#right-pane").append("svg")
  // .attr("width", svgWidth)
  // .attr("height", svgHeight);
  
  Promise.all([
    d3.json("/api/position_income_data"),
    d3.json(`/api/team_position_income_data/${team}`)
  ]).then(([positionIncomeData, teamPositionIncomeData]) => {
    positions = teamPositionIncomeData.map(d => d.position)
    positionIncomeDataFiltered = positionIncomeData.filter(d => positions.includes(d.position))
    allIncomeData = teamPositionIncomeData.concat(positionIncomeDataFiltered)

    // Set the width of the bars to all fit, and fill the available horizontal space
    var barWidth = (svgWidth / (positions.length * 2));

    var height = d3.scaleLinear()
      .domain([0, d3.max(allIncomeData, d => d.avg_income)])
      .range([20, svgHeight - 40]);

    var axisHeight = d3.scaleLinear()
      .domain([0, d3.max(allIncomeData, d => d.avg_income)])
      .range([svgHeight - 40, 20]);

    // Clear the chart
    // svg.selectAll("*").remove()

    var rightAxis = d3.axisRight(axisHeight);

    svg.append("g").call(rightAxis);

    // Create a bar chart in the <svg> to show average NFL pay per position
    svg.selectAll("text.positionLabel")
      .data(positions) // Assign the data values to each bar
      .enter()
      .append("text")
      .attr("class", "positionLabel") // Create the bars
      .attr("y", svgHeight)
      .attr("transform", function (d, i) { // Slide each bar over.  For each data point, this will read like:
        var translate = [2 * barWidth * i, 0]; // .attr("transform, translate(0)"), ...translate(10)"),
        return "translate(" + translate + ") scale(0.5 1)"; // ...translate(20)"), etc.
      })
      .text(d => d);

    // Create a bar chart in the <svg> to show average NFL pay per position
    svg.selectAll("rect.nflBar")
      .data(positionIncomeDataFiltered) // Assign the data values to each bar
      .enter()
      .append("rect")
      .attr("class", "nflBar") // Create the bars
      .attr("y", function (d) { // Remember, we draw our bars starting from the top, down to the x-axis
        return (svgHeight - 20) - height(d.avg_income) // Starting here...
      })
      .attr("height", function (d) { // And going down this far to hit the axis
        return height(d.avg_income);
      })
      .attr("width", barWidth - barPadding) // Make the bars skinnier than their spaces so they don't touch
      .style("fill", "rgb(202, 55, 51)")
      .attr("transform", function (d, i) { // Slide each bar over.  For each data point, this will read like:
        var translate = [2 * barWidth * i, 0]; // .attr("transform, translate(0)"), ...translate(10)"),
        return "translate(" + translate + ")"; // ...translate(20)"), etc.
      });
      
    // Exactly as above, but this time creating bars for a team's averages
    svg.selectAll("rect.teamBar")
      .data(teamPositionIncomeData)
      .enter()
      .append("rect")
      .attr("class", "teamBar")
      .attr("y", function (d) {
        return (svgHeight - 20) - height(d.avg_income)
      })
      .attr("height", function (d) {
        return height(d.avg_income);
      })
      .attr("width", barWidth - barPadding)
      .style("fill", "rgb(16, 59, 112)")
      .attr("transform", function (d, i) {
        var translate = [(2 * barWidth * i) + barWidth - barPadding, 0];
        return "translate(" + translate + ")";
      });
  })
}

d3.json("/api/map_data").then(map_data => {
  var teamIcon = L.Icon.extend({
    options: {
      iconSize: 40,
    }
  });

  var cities = L.layerGroup();

  map_data.forEach(d => {
    const icon = new teamIcon({ iconUrl: `https://static.nfl.com/static/site/img/logos/svg/teams/${d.abbreviation}.svg` })
    const onClick = () => {
      createBarGraph(d.abbreviation)
    }

    L.marker([d.lat, d.long], { icon }).bindPopup(d.team).addTo(cities).on('click', onClick)
  })

  var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

  var satellite = L.tileLayer(mbUrl, { id: 'mapbox/satellite-v9', attribution: mbAttr }),
    streets = L.tileLayer(mbUrl, { id: 'mapbox/streets-v11', attribution: mbAttr });

  var map = L.map('map', {
    center: [37, -98],
    zoom: 3.5,
    layers: [satellite, cities]
  });

  var baseLayers = {
    "Satellite": satellite,
    "Streets": streets
  };

  var overlays = {
    "Cities": cities
  };

  L.control.layers(baseLayers, overlays).addTo(map);
})
