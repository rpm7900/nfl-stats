DROP TABLE IF EXISTS player_stats;
DROP TABLE IF EXISTS player_income;
DROP TABLE IF EXISTS area_income;

CREATE TABLE player_stats(
    name VARCHAR PRIMARY KEY NOT NULL,
    age INT,
    birth_place VARCHAR,
    birthday DATE,
    weight_lbs FLOAT,
    height_in FLOAT,
    college VARCHAR,
    player_id VARCHAR,
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
    player VARCHAR PRIMARY KEY NOT NULL, 
    rank FLOAT,  
    position VARCHAR,
    team VARCHAR,
    cap_hit VARCHAR 
);

CREATE TABLE area_income(
    id INT,
    state_code INT,
    state_name VARCHAR,
    state_ab VARCHAR,
    county VARCHAR,
    city VARCHAR, 
    place VARCHAR, 
    type VARCHAR, 
    primary_type VARCHAR, 
    zip_code INT, 
    area_code INT, 
    a_land INT, 
    a_water INT,
    lat FLOAT,
    lon FLOAT,
    mean INT,
    median INT, 
    st_dev INT, 
    sum_w FLOAT
);

