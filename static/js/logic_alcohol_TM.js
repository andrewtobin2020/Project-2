var svgWidth = 960;
var svgHeight = 600;

var margin = {
  top: 20,jpg
  right: 40,
  bottom: 120,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var baseChart = d3.select(".chart");


// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "spirit_servings"; // changed from hair_length

// function used for updating x-scale var upon click on axis label
function xScale(data, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(data, d => d[chosenXAxis]) * 0.8,
      d3.max(data, d => d[chosenXAxis]) * 1.2
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "spirit_servings") {
    label = "Spirits Per Capita:";
  }
  else if (chosenXAxis === "beer_servings") {
    label = "Beer Per Capita:";
  }
  else if (chosenXAxis === "wine_servings") {
    label = "Wine Per Capita:"; 
  }
  else {
    label = "GDP Per Capita";
  }
   
  // code to create the tooltips
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.country1}<br>${label} ${d[chosenXAxis]} <br> Happiness: ${d.happinessscore}`);
    });

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

  return circlesGroup;
}

// Retrieve data from the CSV file and execute everything below
d3.csv("CombinedDataset").then(function(data, err) {
  if (err) throw err;

  // parse data
  data.forEach(function(data) {
    data.spirit_servings = +data.spirit_servings;
    data.beer_servings = +data.beer_servings;
    data.wine_servings = +data.wine_servings;
    data.happinessscore = +data.happinessscore;
    data.gdp_percapita = +data.gdp_percapita;
  });

  // xLinearScale function above csv import
  var xLinearScale = xScale(data, chosenXAxis);

  // Create y scale function
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.happinessscore)])
    .range([height, 0]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);

  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.happinessscore))
    .attr("r", 4.5)
    .attr("fill", "purple")
    .attr("opacity", ".5");

  // Create group for two x-axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var spiritsLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "spirit_servings") // value to grab for event listener
    .classed("active", true)
    .text("Spirits Per Capita (by Country)");

  var beerLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "beer_servings") // value to grab for event listener
    .classed("inactive", true)
    .text("Beer Per Capita (by Country)");

   var wineLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "wine_servings") // value to grab for event listener
    .classed("inactive", true)
    .text("Wine Per Capita (by Country)");

    var gdpLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 80)
    .attr("value", "gdp_percapita") // value to grab for event listener
    .classed("inactive", true)
    .text("GDP Per Capita (by Country)");


  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Happiness Score");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(data, chosenXAxis);

        // updates x axis with transition
        xAxis = renderAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
        //console.log(chosenXAxis);
        // changes classes to change bold text
        if (chosenXAxis === "spirit_servings") {
          spiritsLabel
            .classed("active", true)
            .classed("inactive", false);
          beerLabel
            .classed("active", false)
            .classed("inactive", true);
          wineLabel
            .classed("active", false)
            .classed("inactive", true);
          gdpLabel
            .classed("active", false)
            .classed("inactive", true);
          baseChart
            .classed("spiritchart", true)
            .classed("beerchart", false)
            .classed("winechart", false)
            .classed("moneychart", false);
        }
        else if (chosenXAxis === "beer_servings") {
          spiritsLabel
            .classed("active", false)
            .classed("inactive", true);
          beerLabel
            .classed("active", true)
            .classed("inactive", false);
          wineLabel
            .classed("active", false)
            .classed("inactive", true);
          wineLabel
            .classed("active", false)
            .classed("inactive", true);
          baseChart
            .classed("spiritchart", false)
            .classed("beerchart", true)
            .classed("winechart", false)
            .classed("moneychart", false);
        }
        else if (chosenXAxis === "wine_servings") {
          spiritsLabel
            .classed("active", false)
            .classed("inactive", true);
          beerLabel
            .classed("active", false)
            .classed("inactive", true);
          wineLabel
            .classed("active", true)
            .classed("inactive", false);
          gdpLabel
            .classed("active", false)
            .classed("inactive", true);  
          baseChart
            .classed("spiritchart", false)
            .classed("beerchart", false)
            .classed("winechart", true)
            .classed("moneychart", false);
        }
        else {
            spiritsLabel
              .classed("active", false)
              .classed("inactive", true);
            beerLabel
              .classed("active", false)
              .classed("inactive", true);
            wineLabel
              .classed("active", false)
              .classed("inactive", true);
            gdpLabel
              .classed("active", true)
              .classed("inactive", false);          
            baseChart
              .classed("spiritchart", false)
              .classed("beerchart", false)
              .classed("winechart", false)
              .classed("moneychart", true);
        }
    }})
}).catch(function(error) {
  console.log(error);
});
