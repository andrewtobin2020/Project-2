// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


//East Asia polygon
L.polygon([
    [47.29, 152.015],
    [19.96, 132.79],
    [27.01, 93.02],
    [39.02, 74.47],
    [49.16, 87.24]

  ], {
    color: "yellow",
    fillColor: "yellow",
    fillOpacity: 0.75
  }).addTo(myMap);

  //Southeast Asia polygon
L.polygon([
    [34.75, 75.64],
    [27.01, 93.02],
    [19.96, 129.95],
    [-9.64, 159.53],
    [-8.98, 103.88],
    [5.67, 72.46],
    [26.11, 67.62]

  ], {
    color: "yellow",
    fillColor: "yellow",
    fillOpacity: 0.75
  }).addTo(myMap);

  //Australia -NZ polygon
L.polygon([
    [-12.10, 121.11],
    [-21.13, 109.82],
    [-48.05, 119.37],
    [-49.28, 179.13],
    [-12.21, 179.59]

  ], {
    color: "yellow",
    fillColor: "yellow",
    fillOpacity: 0.75
  }).addTo(myMap);
  
  // north america coords
  L.polygon([
    [68.62, -166.98],
    [59.46, -56.29],
    [26.95, -78.92],
    [32.60, -122.08]
  ], {
    color: "yellow",
    fillColor: "yellow",
    fillOpacity: 0.75
  }).addTo(myMap);
  // latin america and caribbean coords
  L.polygon([
    [31.53, -118.24],
    [25.10, -75.67],
    [-8.07, -33.25],
    [-56.20, -70.50]
  ], {
    color: "yellow",
    fillColor: "yellow",
    fillOpacity: 0.75
  }).addTo(myMap);



// West Europe
L.polygon([
  [66.80, -25.12],
  [36.85, -23.38],
  [37.69, 13.91],
  [68.14, 23.63]
], {
  color: "blue",
  fillColor: "blue",
  fillOpacity: 0.75
}).addTo(myMap);
//eastern europe
L.polygon([
  [37.69, 13.91],
  [58.25, 160.80],
  [75.03, 157.35],
  [68.14, 23.63],
  [49.64, 17.60]
], {
  color: "green",
  fillColor: "green",
  fillOpacity: 0.75
}).addTo(myMap);



// sub-saharan Africa coordinates 
L.polygon([
  [21.10, -20.72],
  [19.29, 3.90],
  [12.62, 44.86],
  [13.82, 60.68],
  [-34,39, 21.83],
  [-34.46, 20.25]
], {
  color: "lightblue",
  fillColor: "lightblue",
  fillOpacity: 0.75
}).addTo(myMap);



//middle eastern and north Africa
L.polygon([
  [21.09, -14.71],
  [36.08, -5.58],
  [41.56, 42.75],
  [25.86, 61.91],
  [12.62, 44.86]
], {
  color: "red",
  fillColor: "red",
  fillOpacity: 0.75
}).addTo(myMap);

//// ADDING the data to the map features
d3.csv("/CombinedDataset.csv").then(function(data){
  //console.log(data[0]);

});

var SummarybyRegion = d3.nest()
  .key(function(d) { return d.region; })
  .entries(data);

  //console.log(data);

//summarize the data (i.e. do the averaging)

var SummaryAverage = d3.nest()
  .key(function(d) {return d.region;})
  .rollup(function(v) {return {
    count: v.length,
    avgbeer: d3.mean(v,function(d) {return d.beer_servings}),
    avgspirits: d3.mean(v,function(d) {return d.spirit_servings}),
    avgwine: d3.mean(v,function(d) {return d.wine_servings}),
    avghappiness: d3.mean(v,function(d) {return d.happinessscore}),
    avggdp: d3.mean(v,function(d) {return d.gdp_percapita})
  }; })
    .entries(data);
console.log(JSON.stringify(SummaryAverage));






