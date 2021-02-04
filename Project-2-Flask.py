# Imports

from flask import Flask, jsonify
from flask import render_template


# Flask setup 
app = Flask(__name__) 


##############
# Flask routes
##############

# Main route 
@app.route("/")
def welcome(): 
    return render_template("index.html")

# Beer Bar Chart route 
@app.route("/BeerBarChart")
def BarChart():
    return render_template("beerchart.html") 

# Wine Bar Chart route 
@app.route("/WineBarChart")
def BarChart():
    return render_template("winechart.html") 

# Spirits Bar Chart route 
@app.route("/SpiritsBarChart")
def BarChart():
    return render_template("spiritschart.html") 

# Scatter Plots route 
@app.route("/ScatterPlots")
def BarChart():
    return render_template("alcoholplot.html") 

# Mapbox route 
@app.route("/Mapbox")
def BarChart():
    return render_template("map.html") 


if __name__ == "__main__":
  app.run(debug=True) 