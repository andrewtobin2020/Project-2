// code to create the SVG canvas for visualization
var svgWidth = 960;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#svg-area2") // changed from ".chart"
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("CombinedDataset.csv").then(function(data) {
    console.log(data);

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function(data) {
      data.beer_servings = +data.beer_servings;
      data.happinessscore = +data.happinessscore;
       });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.beer_servings)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.happinessscore)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

      var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
            return `<strong>${d.country1}</strong><br>Beer Servings: ${d.beer_servings}<br>Happiness: ${d.happinessscore}`;
          }); 

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);


    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.beer_servings))
    .attr("cy", d => yLinearScale(d.happinessscore))
    .attr("r", "4.5")
    .attr("fill", "blue")
    .attr("opacity", ".5");
    
    
    d3.csv("CombinedDataset.csv").then(function(data) {
    

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
      })
      // onmouseout event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Happiness Score");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
      .attr("class", "axisText")
      .text("Beers Per Serving");

  }).catch(function(error) {
    console.log(error);
  });
});
