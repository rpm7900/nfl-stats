// Average pay per position on the team in question (these are filler values)
var teamSalaries = [80, 100, 56, 120, 180, 30, 40, 120, 160];

// Average pay per same position across the NFL (also filler values)
var nflSalaries = [85, 95, 46, 130, 175, 35, 45, 115, 175];

// Establish size of chart and padding between bars
var svgWidth = d3.select("#right-pane").style("width").slice(0, -2)
var svgHeight = d3.select("#right-pane").style("height").slice(0, -2)

console.log("Height", svgHeight, "Width", svgWidth)

// var svgWidth = 400, svgHeight = 240
var barPadding = 5;

// Set the width of the bars to all fit, and fill the available horizontal space
var barWidth = (svgWidth / (teamSalaries.length + nflSalaries.length));

// Grab the <svg> and set its height and width attributes
var svg = d3.select("#right-pane").append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

d3.json(player_income_query) // "/api/player_income_data")
    .then(function(player_income_data) {

    console.log(player_income_data);

    // Create a bar chart in the <svg> to show average NFL pay per position
    var barChartNfl = svg.selectAll("rect.nflBar")
        .data(nflSalaries) // Assign the data values to each bar
        .enter()
        .append("rect")
        .attr("class", "nflBar") // Create the bars
        .attr("y", function(d) { // Remember, we draw our bars starting from the top, down to the x-axis
             return svgHeight - d // Starting here...
        })
        .attr("height", function(d) { // And going down this far to hit the axis
            return d; 
        })
        .attr("width", barWidth - barPadding) // Make the bars skinnier than their spaces so they don't touch
        .style("fill", "red")
        .attr("transform", function (d, i) { // Slide each bar over.  For each data point, this will read like:
            var translate = [2 * barWidth * i, 0]; // .attr("transform, translate(0)"), ...translate(10)"),
            return "translate("+ translate +")"; // ...translate(20)"), etc.
        });

    // Exactly as above, but this time creating bars for a team's averages
    var barChartTeam = svg.selectAll("rect.teamBar")
        .data(teamSalaries)
        .enter()
        .append("rect")
        .attr("class", "teamBar")
        .attr("y", function(d) {
             return svgHeight - d
        })
        .attr("height", function(d) {
            return d;
        })
        .attr("width", barWidth - barPadding)
        .style("fill", "blue")
        .attr("transform", function (d, i) {
            var translate = [(2 * barWidth * i) + barWidth, 0];
            return "translate("+ translate +")";
        });

});