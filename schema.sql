DROP TABLE IF EXISTS player_stats;
DROP TABLE IF EXISTS player_income;
DROP TABLE IF EXISTS stadium_info;
DROP TABLE IF EXISTS area_income;

CREATE TABLE player_stats(
    name VARCHAR NOT NULL,
    age FLOAT,
    birth_place VARCHAR,
    birthday DATE,
    weight_lbs FLOAT,
    height_in FLOAT,
    college VARCHAR,
    player_id VARCHAR PRIMARY KEY,
    number FLOAT,
    position VARCHAR,
    current_stat VARCHAR, 
    current_team VARCHAR,
    experience VARCHAR, 
    high_school VARCHAR,
    high_school_loc VARCHAR,
    yrs_played VARCHAR
);

CREATE TABLE player_income(
    id SERIAL PRIMARY KEY, 
    name VARCHAR NOT NULL, 
    rank FLOAT,  
    position VARCHAR,
    team VARCHAR,
    cap_hit VARCHAR 
);

CREATE TABLE stadium_info(
    geo_point VARCHAR,
    geo_shape JSON ,
    sector VARCHAR,
    subsector VARCHAR,
    primary_type VARCHAR,
    sec_class VARCHAR,
    date_created DATE,
    date_modified DATE,
    comp_affil VARCHAR,
    name VARCHAR,
    name_2 VARCHAR,
    name_3 VARCHAR,
    address_1 VARCHAR,
    address_2 VARCHAR,
    po_box VARCHAR,
    po_zip VARCHAR,
    city VARCHAR,
    state VARCHAR,
    zip VARCHAR,
    zip_4 VARCHAR,
    county VARCHAR,
    hsip_aoi VARCHAR,
    fema_region FLOAT,
    lat FLOAT,
    long FLOAT,
    reliability VARCHAR,
    coorsource VARCHAR,
    comments VARCHAR,
    conference VARCHAR,
    div VARCHAR,
    capacity FLOAT ,
    roof_type VARCHAR,
    team VARCHAR PRIMARY KEY
);

CREATE TABLE area_income(
    id INT PRIMARY KEY,
    state_code INT,
    state_name VARCHAR,
    state_ab VARCHAR,
    county VARCHAR,
    city VARCHAR, 
    place VARCHAR, 
    type VARCHAR, 
    primary_type VARCHAR, 
    zip_code INT, 
    area_code VARCHAR, 
    a_land VARCHAR, 
    a_water VARCHAR,
    lat FLOAT,
    lon FLOAT,
    mean INT,
    median INT, 
    st_dev INT, 
    sum_w FLOAT
);

