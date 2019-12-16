var teamIcon = L.Icon.extend({
  options: {
      iconSize: [30, 40],
      popupAnchor:  [5, -5]
  }
});

var cardinalsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/ARI.svg'}),
    falconsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/ATL.svg'})
    steelersIcon = new teamIcon({iconUrl: 'https://i.ibb.co/DC08F3d/Steelers-SVG.png', iconSize: [30, 30]})
    brownsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/CLE.svg'})
    bengalsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/CIN.svg'})
    ravensIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/BAL.svg'})
    bearsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/CHI.svg'})
    texansIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/HOU.svg'})
    chiefsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/KC.svg'})
    saintsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/NO.svg'})
    dolphinsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/MIA.svg'})
    buccaneersIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/TB.svg'})
    billsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/BUF.svg'})
    sanfranIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/SF.svg'})
    ramsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/LA.svg'})
    jaguarsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/JAX.svg'})
    eaglesIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/PHI.svg'})
    seahawksIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/SEA.svg'})
    raidersIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/OAK.svg'})
    cowboysIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/DAL.svg'})
    panthersIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/CAR.svg'})
    patriotsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/NE.svg'})
    coltsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/IND.svg'})
    vikingsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/MIN.svg'})
    redskinsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/WAS.svg'})
    titansIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/TEN.svg'})
    chargersIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/LAC.svg'})
    broncosIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/DEN.svg'})
    lionsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/DET.svg'})
    packersIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/GB.svg'})
    jetsIcon = new teamIcon({iconUrl: 'https://seeklogo.net/wp-content/uploads/2011/05/new-york-jets-logo-vector-01.png'})
    giantsIcon = new teamIcon({iconUrl: 'https://static.nfl.com/static/site/img/logos/svg/teams/NYG.svg'})
;

L.icon = function (options) {
  return new L.Icon(options);
};

var cities = L.layerGroup();

L.marker([33.5276, -112.2626], {icon: cardinalsIcon}).bindPopup("Arizona Cardinals").addTo(cities).on('click', cardinalsClick),
L.marker([33.7510, -84.4009], {icon: falconsIcon}).bindPopup("Atlanta Falcons").addTo(cities),
L.marker([39.2780, -76.6227], {icon: ravensIcon}).bindPopup("Baltimore Ravens").addTo(cities),
L.marker([42.7738, -78.7870], {icon: billsIcon}).bindPopup("Buffalo Bills").addTo(cities),
L.marker([35.2258, -80.8528], {icon: panthersIcon}).bindPopup("Carolina Panthers").addTo(cities),
L.marker([41.8623, -87.6167], {icon: bearsIcon}).bindPopup("Daaaa Bears").addTo(cities),
L.marker([39.0955, -84.5161], {icon: bengalsIcon}).bindPopup("Cincinnati Bengals").addTo(cities),
L.marker([41.5061, -81.6995], {icon: brownsIcon}).bindPopup("Cleveland Browns").addTo(cities),
L.marker([32.7473, -97.0945], {icon: cowboysIcon}).bindPopup("Dallas Cowgirls").addTo(cities),
L.marker([39.7439, -105.0201], {icon: broncosIcon}).bindPopup("Denver Broncos").addTo(cities),
L.marker([42.3400, -83.0456], {icon: lionsIcon}).bindPopup("Detroit Lions").addTo(cities),
L.marker([44.5013, -88.0622], {icon: packersIcon}).bindPopup("Green Bay Packers").addTo(cities),
L.marker([29.6847, -95.4107], {icon: texansIcon}).bindPopup("Houston Texans").addTo(cities),
L.marker([39.7601, -86.1639], {icon: coltsIcon}).bindPopup("Indianapolis Colts").addTo(cities),
L.marker([30.3240, -81.6373], {icon: jaguarsIcon}).bindPopup("Jacksonville Jaguars").addTo(cities),
L.marker([39.0489, -94.4839], {icon: chiefsIcon}).bindPopup("Kansas City Chiefs").addTo(cities),
L.marker([33.8644, -118.2611], {icon: chargersIcon}).bindPopup("Los Angeles Chargers").addTo(cities),
L.marker([34.0141, -118.2879], {icon: ramsIcon}).bindPopup("Los Angeles Rams").addTo(cities),
L.marker([25.9580, -80.2389], {icon: dolphinsIcon}).bindPopup("Miami Dolphins").addTo(cities),
L.marker([44.9738, -93.2578], {icon: vikingsIcon}).bindPopup("Minnesota Vikings").addTo(cities),
L.marker([42.0909, -71.2643], {icon: patriotsIcon}).bindPopup("New England Patriots").addTo(cities),
L.marker([29.9511, -90.0812], {icon: saintsIcon}).bindPopup("Who Dat Saints").addTo(cities),
L.marker([40.8135, -74.0745], {icon: giantsIcon}).bindPopup("New York Football Giants").addTo(cities),
L.marker([40.8135, -74.0745], {icon: jetsIcon}).bindPopup("New York Jets").addTo(cities),
L.marker([36.0909, -115.1833], {icon: raidersIcon}).bindPopup("Oakland Raiders").addTo(cities),
L.marker([39.9008, -75.1675], {icon: eaglesIcon}).bindPopup("Philadelphia Eagles").addTo(cities),
L.marker([40.4468, -80.0158], {icon: steelersIcon}).bindPopup("Sixburgh Steelers").addTo(cities),
L.marker([37.4032, -121.9698], {icon: sanfranIcon}).bindPopup("San Fransisco 49ers").addTo(cities),
L.marker([47.5952, -122.3316], {icon: seahawksIcon}).bindPopup("Seattle Seahawks").addTo(cities),
L.marker([27.9759, -82.5033], {icon: buccaneersIcon}).bindPopup("Tampa Bay Buccaneers").addTo(cities),
L.marker([36.1665, -86.7713], {icon: titansIcon}).bindPopup("Tennessee Titans").addTo(cities),
L.marker([38.9076, -76.8645], {icon: redskinsIcon}).bindPopup("Washington Redskins").addTo(cities)
;

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

var satellite   = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', attribution: mbAttr}),
  streets  = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11',   attribution: mbAttr});

var map = L.map('map', {
  center: [37, -98],
  zoom: 3.5,
  layers: [satellite, cities]
});

var baseLayers = {
  "Satellite": satellite,
  "Streets": streets
};

var overlays = {
  "Cities": cities
};

L.control.layers(baseLayers, overlays).addTo(map);

function cardinalsClick(e) {
  console.log("hello world")
};