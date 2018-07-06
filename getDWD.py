import sys
import os
from os.path import isfile, join
import zipfile
from ftplib import FTP
import csv

stationID = sys.argv[1]

#### Logging in to the ftp - server ######
filename = 'stundenwerte_TU_'+stationID+'_akt.zip'
ftp = FTP('ftp-cdc.dwd.de')  
ftp.login()  
#### Dirceting to the correct sub folder and retrieve the file 
ftp.cwd('pub/CDC/observations_germany/climate/hourly/air_temperature/recent/')  
filedata = open(filename, 'wb')  
ftp.retrbinary('RETR '+filename, filedata.write)  
filedata.close()  
ftp.quit()  
#### For every station a folder gets created 
path = 'ressources/'+stationID
if not os.path.exists(path):
    os.mkdir(path, 0755)
#### Unzip the just downloaded file to ressources/
zip_ref = zipfile.ZipFile(filename, 'r')
zip_ref.extractall(path)
zip_ref.close()
#### Read the csv
onlyfiles = [f for f in os.listdir(path) if isfile(join(path, f))]
for filename in onlyfiles:
    if filename.startswith('produkt'):
        file = filename

f = open(path+'/'+file,'rb')
reader = csv.reader(f,delimiter=';')
dates = []
values = []
#### Only extract Time and actual value 
for row in reader:
    value = row[3]
    date = row[1]
    ## Only get March 2018 
    if(date[0:6]=='201805'):
        dates.append(date)
        values.append(value)
### Give back date and values 
print (dates)
print (values)

