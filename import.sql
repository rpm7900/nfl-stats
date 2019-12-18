TRUNCATE player_stats cascade;
TRUNCATE player_income cascade;
TRUNCATE area_income cascade;
TRUNCATE stadium_info cascade;

\COPY player_stats FROM 'resources/player_stats.csv' csv delimiter ',' header;
\COPY player_income (name, rank, position, team,cap_hit) FROM 'resources/player_salary_cleaned.csv' csv delimiter ',' header;
\COPY area_income FROM 'resources/clean_income.csv' csv delimiter ',' header;
\COPY stadium_info (geo_point, geo_shape, sector, subsector, primary_type, sec_class, date_created, date_modified, comp_affil, name, name_2, name_3, address_1, address_2, po_box, po_zip, city, state, zip, zip_4, county, hsip_aoi, fema_region, lat, long, reliability, coorsource, comments, conference, div, capacity, roof_type, team) FROM 'resources/stadiums_cleaned.csv' csv delimiter ',' header;

-- Split New York teams into 2 rows
INSERT INTO stadium_info
SELECT geo_point, geo_shape, sector, subsector, primary_type, sec_class, date_created, date_modified, comp_affil, name, name_2, name_3, address_1, address_2, po_box, po_zip, city, state, zip, zip_4, county, hsip_aoi, fema_region, lat, long, reliability, coorsource, comments, conference, div, capacity, roof_type, ny.new_team
FROM stadium_info
CROSS JOIN (VALUES ('New York Giants'), ('New York Jets')) ny (new_team)
WHERE team = 'New York Giants/ NewYork Jets';

DELETE FROM stadium_info WHERE team = 'New York Giants/ NewYork Jets';

-- Update/fix team names
UPDATE stadium_info SET team = 'Los Angeles Rams', lat = 34.0140526, long = -118.2878754 WHERE team = 'St. Louis Rams';
UPDATE stadium_info SET team = 'Los Angeles Chargers', lat = 33.8643777, long = -118.2611426 WHERE team = 'San Diego Chargers';
UPDATE stadium_info SET team = 'Chicago Bears' WHERE team = 'Chicago Bers';

-- Add abbreviations
UPDATE stadium_info
SET abbreviation = CASE team
    WHEN 'Arizona Cardinals' THEN 'ARI'
    WHEN 'Atlanta Falcons' THEN 'ATL'
    WHEN 'Baltimore Ravens' THEN 'BAL'
    WHEN 'Buffalo Bills' THEN 'BUF'
    WHEN 'Carolina Panthers' THEN 'CAR'
    WHEN 'Chicago Bears' THEN 'CHI'
    WHEN 'Cincinnati Bengals' THEN 'CIN'
    WHEN 'Cleveland Browns' THEN 'CLE'
    WHEN 'Dallas Cowboys' THEN 'DAL'
    WHEN 'Denver Broncos' THEN 'DEN'
    WHEN 'Detroit Lions' THEN 'DET'
    WHEN 'Green Bay Packers' THEN 'GB'
    WHEN 'Houston Texans' THEN 'HOU'
    WHEN 'Indianapolis Colts' THEN 'IND'
    WHEN 'Jacksonville Jaguars' THEN 'JAX'
    WHEN 'Kansas City Chiefs' THEN 'KC'
    WHEN 'Los Angeles Chargers' THEN 'LAC'
    WHEN 'Los Angeles Rams' THEN 'LA'
    WHEN 'Miami Dolphins' THEN 'MIA'
    WHEN 'Minnesota Vikings' THEN 'MIN'
    WHEN 'New England Patriots' THEN 'NE'
    WHEN 'New Orleans Saints' THEN 'NO'
    WHEN 'New York Giants' THEN 'NYG'
    WHEN 'New York Jets' THEN 'NYJ'
    WHEN 'Oakland Raiders' THEN 'OAK'
    WHEN 'Philadelphia Eagles' THEN 'PHI'
    WHEN 'Pittsburgh Steelers' THEN 'PIT'
    WHEN 'Seattle Seahawks' THEN 'SEA'
    WHEN 'San Francisco 49ers' THEN 'SF'
    WHEN 'Tampa Bay Buccaneers' THEN 'TB'
    WHEN 'Tennessee Titans' THEN 'TEN'
    WHEN 'Washington Redskins' THEN 'WAS'
END;