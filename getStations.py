import sys
import os
import csv

filename='/home/eric/Documents/Bachelorarbeit/github/senseBoard_back/senseBoard/ressources/stationen.csv'
f = open(filename,'rb')
reader = csv.reader(f,delimiter=',')
ids = []
lats = []
lons = []
names = []
for row in reader:
    id = row[0]
    lat = row[4]
    lon = row[5]
    name = row[6] 
    if row[2]== '20180703':
        ids.append(id)
        lats.append(lat)
        lons.append(lon)
        names.append(name)
print ids
print lats
print lons 
print names