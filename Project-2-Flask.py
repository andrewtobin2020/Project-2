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
    return render_template("template/index.html")

# Beer Bar Chart route 
@app.route("/BeerBarChart")
def BarChart():
    return render_template("template/beerchart.html") 

# Wine Bar Chart route 
@app.route("/WineBarChart")
def WineChart():
    return render_template("template/winechart.html") 

# Spirits Bar Chart route 
@app.route("/SpiritsBarChart")
def SpiritsChart():
    return render_template("template/spiritschart.html") 

# Scatter Plots route 
@app.route("/ScatterPlots")
def ScatterChart():
    return render_template("template/alcoholplot.html") 

# Mapbox route 
@app.route("/Mapbox")
def Mapbox():
    return render_template("template/map.html") 


if __name__ == "__main__":
  app.run(debug=True) 