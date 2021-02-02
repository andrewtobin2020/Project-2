var ctx = document.getElementById('myChart');
function makeChart(drinks) {
  
    var countryLabels = drinks.map(function(d) {
      return d.country1;
    });
    var drinkData = drinks.map(function(d) {
      return +d.beer_servings;
    });
  
    var chart = new Chart('chart', {
      type: "verticalBar",
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      },
      data: {
        labels: countryLabels,
        datasets: [
          {
            data: drinkData
          }
        ]
      }
    });
  }
  
  // Request data using D3
  d3.csv("CombinedDataset.csv")
    .then(makeChart);