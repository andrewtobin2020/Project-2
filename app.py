# Imports

from flask import Flask, jsonify
from flask import render_template
import pandas as pd

# Flask setup 
app = Flask(__name__) 


##############
# Flask routes
##############

# Main route 
@app.route("/")
def welcome(): 
    return render_template("index.html")

@app.route("/CombinedDataset")
def data():
    return pd.read_csv("CombinedDataset.csv").to_csv()

# Beer Bar Chart route 
@app.route("/BeerBarChart")
def BeerChart():
    return render_template("beerchart.html") 

# Wine Bar Chart route 
@app.route("/WineBarChart")
def wineChart():
    return render_template("winechart.html") 

# Spirits Bar Chart route 
@app.route("/SpiritsBarChart")
def spiritsChart():
    return render_template("spiritschart.html") 

# Scatter Plots route 
@app.route("/ScatterPlots")
def alcoholChart():
    return render_template("alcoholplot.html") 

# Mapbox route 
@app.route("/Mapbox")
def map():
    return render_template("map.html") 
      

if __name__ == "__main__":
  app.run(debug=True) 