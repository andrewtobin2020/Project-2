# Imports
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify 

# Database setup
engine = create_engine("postgresql://postgres:Gamecock2020!@localhost:5432/<DB>")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Passenger = Base.classes.passenger # Example

# Flask setup 
app = Flask(__name__)


##############
# Flask routes
##############

# Main route
@app.route("/")
def welcome():
    # List all routes
    return (
        "Welcome to our project!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/BarChart<br/>"
        f"/api/v1.0/ScatterPlot<br/>"
        f"/api/v1.0/HeatMap<br/>"
    )

# BarChart route
@app.route("/api/v1.0/BarChart")
def BarChart():
    return ""

# ScatterPlot route
@app.route("/api/v1.0/ScatterPlot")
def ScatterPlot():
    return ""

# HeatMap route
@app.route("/api/v1.0/HeatMap")
def HeatMap():
    return "" 
    
    
    