//  Install and load the required packages (leaflet).

    if (!require("leaflet")) install.packages("leaflet")
    library(leaflet)
    
//   Load the NFL venue location data set and convert the header names to lowercase for consistent formatting.
    
    my_venue_file <- read.csv(file = "https://public.opendatasoft.com/explore/dataset/stadiums_nfl/download/?format=csv&timezone=America/New_York&use_labels_for_header=true",
                                header = TRUE,sep = ";")
    my_venue_header <- names(my_venue_file)
    my_venue_header <- tolower(my_venue_header)
    names(my_venue_file) <- my_venue_header

//  Update the location of the LA Rams stadium.

    my_venue_file[10,"latitude"] <- 34.0140526
    my_venue_file[10,"longitude"] <- -118.2878754    
    
//  Evaluate the team names in the data set and assign the mapping icon to the corresponding team logo.

    NFL_icons <- icons(
      iconUrl =       ifelse(my_venue_file$team=="Pittsburgh Steelers", "http://prod.static.steelers.clubs.nfl.com/assets/images/svg/SteelersMark.svg",
                      ifelse(my_venue_file$team=="Cleveland Browns","https://static.nfl.com/static/site/img/logos/svg/teams/CLE.svg",
                      ifelse(my_venue_file$team=="Cincinnati Bengals","https://static.nfl.com/static/site/img/logos/svg/teams/CIN.svg",
                      ifelse(my_venue_file$team=="Baltimore Ravens","https://static.nfl.com/static/site/img/logos/svg/teams/BAL.svg",
                      ifelse(my_venue_file$team=="Chicago Bers","https://static.nfl.com/static/site/img/logos/svg/teams/CHI.svg",
                      ifelse(my_venue_file$team=="Houston Texans","https://static.nfl.com/static/site/img/logos/svg/teams/HOU.svg",
                      ifelse(my_venue_file$team=="Kansas City Chiefs","https://static.nfl.com/static/site/img/logos/svg/teams/KC.svg",
                      ifelse(my_venue_file$team=="New Orleans Saints","https://static.nfl.com/static/site/img/logos/svg/teams/NO.svg",
                      ifelse(my_venue_file$team=="Miami Dolphins","https://static.nfl.com/static/site/img/logos/svg/teams/MIA.svg",
                      ifelse(my_venue_file$team=="Tampa Bay Buccaneers","https://static.nfl.com/static/site/img/logos/svg/teams/TB.svg",
                      ifelse(my_venue_file$team=="Atlanta Falcons","https://static.nfl.com/static/site/img/logos/svg/teams/ATL.svg",
                      ifelse(my_venue_file$team=="Buffalo Bills","https://static.nfl.com/static/site/img/logos/svg/teams/BUF.svg",
                      ifelse(my_venue_file$team=="San Francisco 49ers","https://static.nfl.com/static/site/img/logos/svg/teams/SF.svg",
                      ifelse(my_venue_file$team=="St. Louis Rams","https://static.nfl.com/static/site/img/logos/svg/teams/LA.svg",
                      ifelse(my_venue_file$team=="Jacksonville Jaguars","https://static.nfl.com/static/site/img/logos/svg/teams/JAX.svg",
                      ifelse(my_venue_file$team=="Philadelphia Eagles","https://static.nfl.com/static/site/img/logos/svg/teams/PHI.svg",
                      ifelse(my_venue_file$team=="Seattle Seahawks","https://static.nfl.com/static/site/img/logos/svg/teams/SEA.svg",
                      ifelse(my_venue_file$team=="Oakland Raiders","https://static.nfl.com/static/site/img/logos/svg/teams/OAK.svg",
                      ifelse(my_venue_file$team=="Dallas Cowboys","https://static.nfl.com/static/site/img/logos/svg/teams/DAL.svg",
                      ifelse(my_venue_file$team=="Carolina Panthers","https://static.nfl.com/static/site/img/logos/svg/teams/CAR.svg",
                      ifelse(my_venue_file$team=="New England Patriots","https://static.nfl.com/static/site/img/logos/svg/teams/NE.svg",
                      ifelse(my_venue_file$team=="Indianapolis Colts","https://static.nfl.com/static/site/img/logos/svg/teams/IND.svg",
                      ifelse(my_venue_file$team=="Minnesota Vikings","https://static.nfl.com/static/site/img/logos/svg/teams/MIN.svg",
                      ifelse(my_venue_file$team=="Washington Redskins","https://static.nfl.com/static/site/img/logos/svg/teams/WAS.svg",
                      ifelse(my_venue_file$team=="Tennessee Titans","https://static.nfl.com/static/site/img/logos/svg/teams/TEN.svg",
                      ifelse(my_venue_file$team=="San Diego Chargers","https://static.nfl.com/static/site/img/logos/svg/teams/LAC.svg",
                      ifelse(my_venue_file$team=="Denver Broncos","https://static.nfl.com/static/site/img/logos/svg/teams/DEN.svg",
                      ifelse(my_venue_file$team=="Detroit Lions","https://static.nfl.com/static/site/img/logos/svg/teams/DET.svg",
                      ifelse(my_venue_file$team=="Green Bay Packers","https://static.nfl.com/static/site/img/logos/svg/teams/GB.svg",
                      ifelse(my_venue_file$team=="Arizona Cardinals","https://static.nfl.com/static/site/img/logos/svg/teams/ARI.svg",
                      ifelse(my_venue_file$team=="New York Giants/ NewYork Jets", "https://static.nfl.com/static/site/img/logos/svg/teams/NYG.svg",""))))))))))))))))))))))))))))))),                         iconWidth = 38, iconHeight = 95,
      iconAnchorX = 22, iconAnchorY = 94,
      shadowWidth = 50, shadowHeight = 64,
      shadowAnchorX = 4, shadowAnchorY = 62
    
//   Create a data frame that contains the latitude and longitude of the NFL venue locations

    NFL_team <- as.character(my_venue_file$team)
    NFL_df <- data.frame(lat=my_venue_file$latitude, lng = my_venue_file$longitude)

//  Create an interactive map of the NFL venue locations using the leaflet package.
    
    NFL_df %>%
      leaflet() %>% 
      addTiles() %>% 
      addMarkers(icon=NFL_icons, popup=NFL_team,clusterOptions = markerClusterOptions())