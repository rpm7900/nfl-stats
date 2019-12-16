d3.json("/api/map_data").then(map_data => {
  console.log('This worked');
  console.log(map_data);

  var test = map_data.map(row => LatLng(row.lat, row.long));
  console.log(lat)
});

d3.json("/api/player_income_data").then(player_income_data => {
  console.log('This worked');
  console.log(player_income_data);
});

d3.json("/api/team_income_data").then(team_income_data => {
  console.log('This worked');
  console.log(team_income_data);
});