import sys
import os
import csv
def __main__():
    title = sys.argv[1]
    filename='/home/eric/Documents/Bachelorarbeit/senseboard_backend/senseBoard/ressources/stationen'+title+'.csv'
    f = open(filename,'rb')
    reader = csv.reader(f,delimiter=',')
    ids = []
    lats = []
    lons = []
    with open(filename, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for row in reader:
            id = row[0]
            lat = row[3]
            lon = row[4]
            
            if row[2] == '20180713' or row[2]=="20180716":
                ids.append(id)
                lats.append(lat)
                lons.append(lon)

    print (ids)
    print (lats)
    print (lons )

    return
if len(sys.argv)>1:
    __main__()
