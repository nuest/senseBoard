import sys
import os
from os.path import isfile, join
import zipfile
from ftplib import FTP
import csv


def __main__():
    stationID = sys.argv[1]
    phenomenon = sys.argv[2] ## TU = air_temperature temperatur PO = Pressure
    title = ''
    if(phenomenon=='TU'):
        title = '/air_temperature'
    if(phenomenon=='P0'):
        title = '/pressure'

    path = "/home/eric/Documents/Bachelorarbeit/senseboard_backend/senseBoard/data/"+stationID+"_"+phenomenon
    if not os.path.exists(path):
        os.mkdir(path)
    #### Logging in to the ftp - server ######
    filename = 'stundenwerte_'+phenomenon+'_'+stationID+'_akt.zip'
    ftp = FTP('ftp-cdc.dwd.de')  
    ftp.login()  
    #### Dirceting to the correct sub folder and retrieve the file 
    folder = 'pub/CDC/observations_germany/climate/hourly'+title+'/recent/'
    ftp.cwd(folder)  
    filedata = open(filename, 'wb')  
    ftp.retrbinary('RETR '+filename, filedata.write)  
    filedata.close()  
    ftp.quit()  
    #### For every station a folder gets created 
    

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
        if(date[0:8]=='20180715'):
            date_edit = date[4:6]+"-"+date[6:8]
            dates.append(date_edit)
            values.append(float(value.strip()))
    ### Give back date and values 
    print (dates)
    print (values)
    return
if len(sys.argv)>1:
    __main__()

