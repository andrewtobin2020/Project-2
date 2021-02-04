// ****MAP and Components********
var myMap = L.map("map", {
    center: [0, 50],
    zoom: 2.3
  });
  
var map = d3.select(document.body).append("svg")


  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  

//// ADDING the data
d3.csv("/CombinedDataset.csv").then(function(data){
 view(data);
console.log(data);

});

function view(mydata) {
var SummarybyRegion = d3.nest()
  .key(function(d) { return d.region; })
  .entries(mydata);
  
//*******summarize the data (i.e. do the averaging)*****

      var SummaryAverage = d3.nest()
      .key(function(d) {return d.region;})
      .rollup(function(v) {return {
        Countries: v.length,
        Beer: d3.mean(v,function(d) {return d.beer_servings}),
        Spirits: d3.mean(v,function(d) {return d.spirit_servings}),
        Wine: d3.mean(v,function(d) {return d.wine_servings}),
        Happiness: d3.mean(v,function(d) {return d.happinessscore}),
        GDP: d3.mean(v,function(d) {return d.gdp_percapita})
      }; })
        .entries(mydata);
    console.log(JSON.stringify(SummaryAverage));

    
///******make summaries for each as variable********

      //east asia summary
    var eastAsiaSummary = SummaryAverage.find(function(summary){
      console.log(summary.key);
      return summary.key ==="Eastern Asia"

    })
    console.log(eastAsiaSummary);

       //southeast asia summary
    var southasiaSummary = SummaryAverage.find(function(summary){
      return summary.key==="Southeastern Asia"
    })
    console.log(southasiaSummary);

     //western europe summary
    var westeuropeSummary = SummaryAverage.find(function(summary){
      return summary.key==="Western Europe"
    })
    console.log(westeuropeSummary);

       //eastern europe summary
    var easteuropeSummary = SummaryAverage.find(function(summary){
      return summary.key==="Central and Eastern Europe"
    })
    console.log(easteuropeSummary);

      //south america summary
    var samericaSummary = SummaryAverage.find(function(summary){
      return summary.key==="Latin America and Caribbean"
    })
    console.log(samericaSummary);

      //north america summary
    var namericaSummary = SummaryAverage.find(function(summary){
      return summary.key==="North America"
    })
    console.log(namericaSummary);

      //Middle East summary
    var middleeastSummary = SummaryAverage.find(function(summary){
      return summary.key==="Middle East and Northern Africa"
      })
    console.log(middleeastSummary); 

      //Subsaharan Africa summary
    var africaSummary = SummaryAverage.find(function(summary){
      return summary.key==="Sub-Saharan Africa"
    })
    console.log(africaSummary); 

    //australia summary
    var australiaSummary = SummaryAverage.find(function(summary){
        return summary.key==="Australia and New Zealand"
          })
    console.log(australiaSummary); 
            
            

/// ******ADDING ALL THE POLYGONS FOR EACH REGION******
      //East Asia Polygon
      var eastAsia= L.polygon([
        [47.29, 152.015],
        [19.96, 132.79],
        [27.01, 93.02],
        [39.02, 74.47],
        [49.16, 87.24]

      ], {
        color: "black",
        fillColor: "yellow",
        fillOpacity: 0.75
      }).addTo(myMap).bindTooltip(tooltiptext(eastAsiaSummary));

    //Southeast Asia polygon
    var southAsia = L.polygon([
        [34.75, 75.64],
        [27.01, 93.02],
        [19.96, 129.95],
        [-9.64, 159.53],
        [-8.98, 103.88],
        [5.67, 72.46],
        [26.11, 67.62]

      ], {
        color: "black",
        fillColor: "yellow",
        fillOpacity: 0.75
      }).addTo(myMap).bindTooltip(tooltiptext(southasiaSummary));

      //Australia -NZ polygon
    L.polygon([
        [-12.10, 121.11],
        [-21.13, 109.82],
        [-48.05, 119.37],
        [-49.28, 179.13],
        [-12.21, 179.59]

      ], {
        color: "black",
        fillColor: "yellow",
        fillOpacity: 0.75
      }).addTo(myMap).bindTooltip(tooltiptext(australiaSummary));
      
      // north america coords
      L.polygon([
        [68.62, -166.98],
        [59.46, -56.29],
        [26.95, -78.92],
        [32.60, -122.08]
      ], {
        color: "black",
        fillColor: "yellow",
        fillOpacity: 0.75
      }).addTo(myMap).bindTooltip(tooltiptext(namericaSummary));

      // latin america and caribbean coords
      L.polygon([
        [31.53, -118.24],
        [25.10, -75.67],
        [-8.07, -33.25],
        [-56.20, -70.50]
      ], {
        color: "black",
        fillColor: "yellow",
        fillOpacity: 0.75
      }).addTo(myMap).bindTooltip(tooltiptext(samericaSummary));

    // West Europe
    var westeurope=L.polygon([
      [66.80, -25.12],
      [36.85, -23.38],
      [37.69, 13.91],
      [68.14, 23.63]
    ], {
      color: "black",
      fillColor: "yellow",
      fillOpacity: 0.75
    }).addTo(myMap).bindTooltip(tooltiptext(westeuropeSummary));

    //eastern europe
    var easteurope = L.polygon([
      [37.69, 13.91],
      [58.25, 160.80],
      [75.03, 157.35],
      [68.14, 23.63],
      [49.64, 17.60]
    ], {
      color: "black",
        fillColor: "yellow",
      fillOpacity: 0.75
    }).addTo(myMap).bindTooltip(tooltiptext(easteuropeSummary));

    // sub-saharan Africa coordinates 
    L.polygon([
      [21.10, -20.72],
      [19.29, 3.90],
      [12.62, 44.86],
      [13.82, 60.68],
      [-34,39, 21.83],
      [-34.46, 20.25]
    ], {
      color: "black",
        fillColor: "yellow",
      fillOpacity: 0.75
    }).addTo(myMap).bindTooltip(tooltiptext(africaSummary));

    //middle eastern and north Africa
    L.polygon([
      [21.09, -14.71],
      [36.08, -5.58],
      [41.56, 42.75],
      [25.86, 61.91],
      [12.62, 44.86]
    ], {
      color: "black",
        fillColor: "yellow",
      fillOpacity: 0.75
    }).addTo(myMap).bindTooltip(tooltiptext(middleeastSummary));

    };

    /// *******define what is supposed to be in the popup summary*******
    var formatDecimal = d3.format(",.2f");
    
    function tooltiptext(summary){
      console.log(summary)
      
    
      var GDP = (d3.format(".2f")(summary.value.GDP))
      var Beer = (d3.format(".2f")(summary.value.Beer))
      var Wine = (d3.format(".2f")(summary.value.Wine))
      var Spirits = (d3.format(".2f")(summary.value.Spirits))
      var Happiness = (d3.format(".2f")(summary.value.Happiness))

      

      return (`<h3>${summary.key}</h3>(Average Per Capita Values)`+ `<br>` 
                +`Countries:${summary.value.Countries}`+ `<br>` 
                +`GDP:${GDP}`+ `<br>` 
                +`Beer:${Beer}`+ `<br>` 
                +`Wine:${Wine}`+ `<br>` 
                +`Spirits:${Spirits}`+ `<br>` 
                +`Happiness:${Happiness}`+ `<br>`
                )
      }



  
  




