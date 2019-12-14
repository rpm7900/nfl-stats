from flask import Flask, jsonify , render_template, send_from_directory
import sqlalchemy
import numpy as np
import psycopg2
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine , func
from sqlalchemy.orm import Session

# create engine
engine = create_engine('postgresql+psycopg2://postgres: @localhost/nfl_database')

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Flask Setup
app = Flask(__name__, static_folder='static')

# Create our session (link) from Python to the DB
session = Session(engine)


# stats = Base.classes.player_stats
# area_income = Base.classes.area_income

@app.route("/")
def frontpage():
    return app.send_static_file('index.html')

@app.route('/js/<path:path>')
def load_js(path):
    return send_from_directory('static/js',path)

@app.route('/css/<path:path>')
def load_css(path):
    return send_from_directory('static/css',path)

@app.route("/api/map_data")
def map_query():

    # Create our session (link) from Python to the DB
    session = Session(engine)
    stadium = Base.classes.stadium_info

    # data points for map 
    stadium_results = session.query(stadium.team,stadium.lat,stadium.long).all()

     #Close session
    session.close()

    stadium_records = [dict(zip(row.keys(), row)) for row in stadium_results]
    return jsonify(stadium_records)

@app.route("/api/player_income_data")
def player_income_query():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    player_income = Base.classes.player_income
    # data points for bar 
    player_income_results = session.query(player_income.position,func.round(func.avg(player_income.cap_hit),2).label('avg_income')).group_by(player_income.position).all()

     #Close session
    session.close()

    player_income_records = [dict(zip(row.keys(), row)) for row in player_income_results]
    print(player_income_records)
    return jsonify(player_income_records)

@app.route("/api/team_income_data")
def team_income_query():

    # Create our session (link) from Python to the DB
    session = Session(engine)
    player_income = Base.classes.player_income
    team_income_results = session.query(player_income.team,func.round(func.avg(player_income.cap_hit),2).label('avg_income')).group_by(player_income.team).all()

    #Close session
    session.close()

    team_income_records = [dict(zip(row.keys(), row)) for row in team_income_results]
    return jsonify(team_income_records)

app.run()