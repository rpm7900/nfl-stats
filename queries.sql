--Player team names 

SELECT player_stats.name, player_income.position
FROM player_stats 
JOIN player_income ON player_stats.name = player_income.name;

--player names and information 
-- SELECT name, birth_place, birthday, current_team, position FROM player_stats
-- WHERE 
