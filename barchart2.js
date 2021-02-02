// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;
// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};
// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
// Load data from CombinedDataset.csv
d3.csv("CombinedDataset.csv").then(function(CombinedData) {
  // Print the CombinedData
  console.log(CombinedData);
  // Cast the hours value to a number for each piece of tvData
  //tvData.forEach(function(data) {
    //data.hours = +data.hours;
  //});
  var barSpacing = 10; // desired space between each bar
  var scaleY = 10; // 10x scale on rect height
 // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (CombinedData.length - 1))) / CombinedData.length;
   // @TODO
  // Create code to build the bar chart using the tvData.
  chartGroup.selectAll(".bar")
            .data(CombinedData)
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("width", data => barWidth)
            .attr("height", data => data.happinessscore * scaleY)
            .attr("x", (data, index) => index * (barWidth + barSpacing))
            .attr("y", data => chartHeight - data.happinessscore * scaleY);
}).catch(function(error) {
  console.log(error);
});