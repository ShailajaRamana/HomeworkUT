// @TODO: YOUR CODE HERE!
// //Overall function
// var main = function() {
    var svgWidth = 960;
    var svgHeight = 500;
    
    var margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100,
    };
    
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    
    // Create an SVG wrapper, append an SVG group that will hold our chart,
    // and shift the latter by left and top margins.
    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    
    // Append an SVG group
    var chartGroup = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    (async function() {
        var healthcareData = await d3
            .csv("assets/data/data.csv")
            .catch(function(error) {
                console.log(error);
            });
        console.log(healthcareData);
    
        //parse data
        healthcareData.forEach(function(data) {
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare;
        });
        console.log(healthcareData);
    
        //create scale functions
        var xScale = d3
            .scaleLinear()
            .domain([0, d3.max(healthcareData, (d) => d.healthcare)])
            .range([0, width]);
        var yScale = d3
            .scaleLinear()
            .domain([0, d3.max(healthcareData, (d) => d.poverty)])
            .range([height, 0]);
    
        //create axis functions
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);
    
        //append axes to the chart
        chartGroup
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
        chartGroup.append("g").call(yAxis);
    
        //create circles
        var circlesGroup = chartGroup
            .selectAll("circle")
            .data(healthcareData)
            .join("circle")
            .attr("cx", (d) => xScale(d.healthcare))
            .attr("cy", (d) => yScale(d.poverty))
            .attr("r", "15")
            .attr("fill", "red");
    
        //initialize tool tip
        var toolTip = d3
            .tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(d) {
                return ``;
            });
    })();
    
   