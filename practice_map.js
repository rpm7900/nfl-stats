// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// set the dimensions and margins of the graph
var chartMargin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 80
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it and set the dimensions
var svg = d3.select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

//Append a group to the SVG area and shift ('translate') it to the right
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)

//Read the data
d3.json("/api/player_income_data").then(player_income_data => {
    console.log('This worked');
    console.log(player_income_data);

    
    //Add x axis
    var x = d3.scaleLinear()
        .domain([0, d3.max(HealthData, d => d.poverty)])
        .range([0, chartWidth]);


    //Add y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(HealthData, d => d.healthcare)])
        .range([chartHeight, 0]);

    //Create two new functions passing out scales in as arguments
    //These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(x);
    var leftAxis = d3.axisLeft(y);

    //Append two SVG group elements to the chartGroup area,
    //and create the bottom and left axis inside of them
    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 10})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-color", "black")
        .text("In Poverty (%)")

    chartGroup.append("text")  
        .attr("transform", "rotate(-90)")
        .attr("y", 30 - (chartMargin.left))
        .attr("x",0 - (chartHeight / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("font-color", "black")
        .text("Lacks Healthcare (%)")

    states = chartGroup.selectAll(".scatter")
        .data(HealthData)
        .enter()
        .append("g")
        .attr("class", "state")
    
    states.append("circle")
        .attr("cx", d => x(d.poverty))
        .attr("cy", d => y(d.healthcare))
        .attr("r", 10)
        .attr("fill", "teal")

    states.append("text")
        .attr("x",d => x(d.poverty))
        .attr("y", d => y(d.healthcare))
        .attr("font_family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black")
        .text(d => d.abbr)
});