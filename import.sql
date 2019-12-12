truncate player_stats cascade;
truncate player_income cascade;
truncate area_income cascade;
truncate stadium_info cascade;

\copy player_stats from 'resources/player_stats.csv' csv delimiter ',' header;
\copy player_income (name, rank, position, team,cap_hit) from 'resources/player_salary_cleaned.csv' csv delimiter ',' header;
\copy area_income from 'resources/clean_income.csv' csv delimiter ',' header;
\copy stadium_info from 'resources/stadiums_cleaned.csv' csv delimiter ',' header;