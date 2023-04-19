from sqlalchemy import create_engine, Table
from sqlalchemy.orm import Session
from flask import Flask, jsonify, request, render_template
from sqlalchemy.ext.automap import automap_base

engine = create_engine('postgresql://postgres:postgres@127.0.0.1/crime')
session = Session(bind=engine)
Base = automap_base()
Base.prepare(autoload_with=engine)

## Mirror the database
assault = Base.classes.assault
auto_theft = Base.classes.auto_theft
bike_theft = Base.classes.bike_theft
break_and_enter = Base.classes.break_and_enter
homicide = Base.classes.homicide
neighbourhoods = Base.classes.neighbourhoods
robbery = Base.classes.robbery
shooting = Base.classes.shooting
theft_from_vehicle = Base.classes.theft_from_vehicle
theft_over = Base.classes.theft_over

app = Flask(__name__)

@app.route('/crime_data')
## use this in d3.json --> 127.0.0.1/crime_data?crime_type=x&?neighborhood=y&?start_year=z&?end_year=zz
def crime_data():
    # Retrieve user-selected filters from request parameters
    neighborhood = request.args.get('neighborhood')
    crime_type = request.args.get('crime_type')
    start_year = request.args.get('start_year')
    end_year = request.args.get('end_year')

    # Retrieve data from database using filters
    if neighborhood and start_year and end_year:
        # Construct query for selected crime_type table
        table = Table(crime_type, Base.metadata, autoload=True, autoload_with=engine)
        query = session.query(table).filter(table.columns.HOOD_158 == neighborhood, table.columns.REPORT_YEAR >= start_year, table.columns.REPORT_YEAR <= end_year)
        rows = query.all()

        # Convert rows to a list of dictionaries
        data = [row._asdict() for row in rows]
        # Return data as JSON object
        return jsonify({'data': data})
    else:
        # Return error message if required filters are not present
        return jsonify({'error': 'Please select a neighborhood and a start year and end year range.'})
    
