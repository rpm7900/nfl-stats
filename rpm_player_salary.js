

// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
    width = 800 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("/resources/rpm_bubble_player_salary.csv").then(nflData => {
  
  console.log("hi");
  // console.log(nflData);

  var nflDataFormatted = nflData.map(function(data) {
    data.Position = data.Position
    data.Experience = +data.Experience
    data.Salary = +data.Salary
    data.xSalary = +data.xSalary
    return data
  });
  console.log(nflDataFormatted)


  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 25000000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 23])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([ 4, 40]);

  // Add a scale for bubble color
  var myColor = d3.scaleOrdinal()
    .domain(["Offense", "Defense", "Special Teams"])
    .range(d3.schemeSet2);

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3.select("#my_dataviz")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Position: " + d.Position)
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  // Add dots
  svg.append('g')
    .selectAll("circle")
    .data(nflDataFormatted)
    .enter()
    .merge(svg)
    .append("circle")
      .attr("class", "bubbles")
      .attr("cx", function (d) { return x(d.xSalary); } )
      .attr("cy", function (d) { return y(d.Experience); } )
      .attr("r", function (d) { return z(d.Salary); } )
      .style("fill", function(d) {return myColor(d.Position); } )
    // -3- Trigger the functions
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )

// legend

    // Add legend: circles
    var valuesToShow = [10000000, 100000000, 1000000000]
    var xCircle = 390
    var xLabel = 440
    // svg
    //   .selectAll("legend")
    //   .data(valuesToShow)
    //   .enter()
    //   .append("circle")
    //     .attr("cx", xCircle)
    //     .attr("cy", function(d){ return height - 100 - z(d) } )
    //     .attr("r", function(d){ return z(d) })
    //     .style("fill", "none")
    //     .attr("stroke", "black")

    // Add legend: segments
    // svg
    //   .selectAll("legend")
    //   .data(valuesToShow)
    //   .enter()
    //   .append("line")
    //     .attr('x1', function(d){ return xCircle + z(d) } )
    //     .attr('x2', xLabel)
    //     .attr('y1', function(d){ return height - 100 - z(d) } )
    //     .attr('y2', function(d){ return height - 100 - z(d) } )
    //     .attr('stroke', 'black')
    //     .style('stroke-dasharray', ('2,2'))

    // // Add legend: labels
    // svg
    //   .selectAll("legend")
    //   .data(valuesToShow)
    //   .enter()
    //   .append("text")
    //     .attr('x', xLabel)
    //     .attr('y', function(d){ return height - 100 - z(d) } )
    //     .text( function(d){ return d/1000000 } )
    //     .style("font-size", 10)
    //     .attr('alignment-baseline', 'middle')

    // // Legend title
    // svg.append("text")
    //   .attr('x', xCircle)
    //   .attr("y", height - 100 +30)
    //   .text("Population (M)")
    //   .attr("text-anchor", "middle")

    // Add one dot in the legend for each name.
    var size = 20
    var allgroups = ["Offense", "Defense", "Special Teams"]
    svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 390)
        .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return myColor(d)})
        // .on("mouseover", highlight)
        // .on("mouseleave", noHighlight)

        // Add labels beside legend dots
    svg.selectAll("mylabels")
    .data(allgroups)
    .enter()
    .append("text")
      .attr("x", 390 + size*.8)
      .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function(d){ return myColor(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      // .on("mouseover", highlight)
      // .on("mouseleave", noHighlight)



  });
