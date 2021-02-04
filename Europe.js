// Create a map object
var myMap = L.map("map", {
  center: [47.61, -15.29],
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

  // Central and Eastern Europe
  L.polygon([ 
    [36.97, 17.80],
    [75.03, 157.35],
    [58.25, 160.80],
    [60.04, 20.62],
    [49.64, 17.60]
  ], {
    color: "green",
    fillColor: "green",
    fillOpacity: 0.75
  }).addTo(myMap);

