// set aside space for the graphics
/* var svgWidth = 1000;
var svgHeight = 500;

// create an SVG element
var svg = d3.select("#svg-area") // need to find or create space on index.html for line chart
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
 */
// Load csv data
//d3.csv("NCHS_life_expectancy_at_birth.csv").then(function(lifeData) {

//  console.log(lifeData);
//read in csv file and manipulate the data
//d3.csv("CombinedDataset.csv").then(function(alcoData){
//    console.log(alcoData);
 
    
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// append the svg object to the body of the page
var svg = d3.select("#svg-area")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
//Read the data
d3.csv("CombinedDataset.csv", function(data) {
   // console.log(data);
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 400])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 50])
    .range([ height, 0]);
    //console.log(x);
    //console.log(y);
  svg.append("g")
    .call(d3.axisLeft(y));

    data.spirit_servings = +data.spirit_servings;
    data.happinessscore = +data.happinessscore;
    var xValues = x(data.spirit_servings);
    var yValues = y(data.happinessscore);
    console.log(xValues);
    console.log(yValues);

  // Add dots
  svg.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(data.spirit_servings))
    .attr("cy", d => y(data.happinessscore))
    .attr("r", 1.5)
    .style("fill", "#69B3A2");
      console.log("test"); 
      console.log("test2");

/* // Add X axis
var x = d3.scaleLinear()
.domain([0, 4000])
.range([ 0, svgWidth ]);
svg.append("g")
.attr("transform", "translate(0," + svgHeight + ")")
.call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
.domain([0, 50000])
.range([ svgHeight, 0]);
svg.append("g")
.call(d3.axisLeft(y));

// Add dots
svg.append('g')
.selectAll("dot")
.data(alcoData)
.enter()
.append("circle")
  .attr("cx", function (d) { return x(d.spirit_servings); } )
  .attr("cy", function (d) { return y(d.happinessscore); } )
  .attr("r", 1.5)
  .style("fill", "#69b3a2")
 */
  // cast the data from the csv as numbers
 /*  alcoData.forEach(function(data) {
    data.beer_servings = +data.beer_servings;
    data.wine_servings = +data.wine_servings;
    data.spirit_servings = +data.spirit_servings;
  });

  // Create a scale for your independent (x) coordinates
  var xScale = d3.scaleLinear()
    .domain(d3.extent(alcoData, d => d.spirit_servings))
    .range([0, svgWidth]);

  // Create a scale for your dependent (y) coordinates
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(alcoData, d => d.happinessscore)])
    .range([svgHeight, 0]);

  // create a line generator function and store as a variable
  // use the scale functions for x and y data
  var createLine = d3.scatter()
    .x(alcoData => xScale(alcoData.spirit_servings))
    .y(data => yScale(data.happinessscore));

  // Append a path element to the svg, make sure to set the stroke, stroke-width, and fill attributes.
  svg.append("path")
    .attr("stroke", "black")
    .attr("stroke-width", "1")
    .attr("fill", "none")
    .attr("d", createLine(alcoData));
 */
}).catch(function(error) {
  console.log(error);
});