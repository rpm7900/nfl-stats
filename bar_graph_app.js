// Average pay per position on the team in question (these are filler values)
var teamSalaries = [80, 100, 56, 120, 180, 30, 40, 120, 160];

// Average pay per same position across the NFL (also filler values)
var nflSalaries = [85, 95, 46, 130, 175, 35, 45, 115, 175];

// Establish size of chart and padding between bars
var svgWidth = 500, svgHeight = 300, barPadding = 5;

// Set the width of the bars to all fit, and fill the available horizontal space
var barWidth = (svgWidth / teamSalaries.length);

// Grab the <svg> and set its height and width attributes
var svg = d3.body.select("#right-pane").select("svg")
    .enter()
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Create a bar chart in the <svg> to show average NFL pay per position
var barChartNfl = svg.selectAll("rect.nflBar")
    .data(nflSalaries) // Assign the data values to each bar
    .enter()
    .append("rect.nflBar") // Create the bars
    .attr("y", function(d) { // Remember, we draw our bars starting from the top, down to the x-axis
         return svgHeight - d // Starting here...
    })
    .attr("height", function(d) { // And going down this far to hit the axis
        return d; 
    })
    .attr("width", barWidth - barPadding) // Make the bars skinnier than their spaces so they don't touch
    .attr("color", "red")
    .attr("transform", function (d, i) { // Slide each bar over.  For each data point, this will read like:
        var translate = [2 * barWidth * i, 0]; // .attr("transform, translate(5)"), ...translate(10)"),
        return "translate("+ translate +")"; // ...translate(15)"), etc.
    });

// Exactly as above, but this time creating bars for a team's averages
var barChartTeam = svg.selectAll("rect.teamBar")
    .data(teamSalaries)
    .enter()
    .append("rect.teamBar")
    .attr("y", function(d) {
         return svgHeight - d
    })
    .attr("height", function(d) {
        return d;
    })
    .attr("width", barWidth - barPadding)
    .attr("color", "blue")
    .attr("transform", function (d, i) {
        var translate = [(2 * barWidth * i) + barWidth, 0];
        return "translate("+ translate +")";
    });