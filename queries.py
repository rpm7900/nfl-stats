import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine 
from sqlalchemy.orm import Session

engine = create_engine('postgresql+psycopg2://postgres:Kickingass2019@localhost/nfl_database')

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

Base.classes.keys()