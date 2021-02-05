var ctx = 'myChart';
function makeChart(drinks) {
  
    var countryLabels = drinks.map(function(d) {
      return d.country1;
    });
    var drinkData = drinks.map(function(d) {
      return +d.wine_servings;
    });

    var drinkColors = drinks.map(function(d) {
        return d.wine_servings > 150 ? '#36a2eb' : '#cc65fe';
    });
  
    var chart = new Chart(ctx, {
      type: "bar",
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Wine Servings per Person per Country',
          fontSize: 24
        }
      },
      data: {
        labels: countryLabels,
        datasets: [
          {
            data: drinkData,
            backgroundColor: drinkColors
          }
        ]
      }
    });
  }
  
  // Request data using D3
  d3.csv("CombinedDataset")
    .then(makeChart);