import pandas as pd 

stats_pd= pd.read_csv("resources/Basic_Stats.csv", ",")


stats_pd = stats_pd['Name'].str.split(', ').str[::-1].str.join(' ')

print(stats_pd.name)