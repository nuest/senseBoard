import sys
import os
import zipfile
from ftplib import FTP
import csv
stationID = '00150'

filename = 'stundenwerte_TU_'+stationID+'_akt.zip'
ftp = FTP('ftp-cdc.dwd.de')  
ftp.login()  
ftp.cwd('pub/CDC/observations_germany/climate/hourly/air_temperature/recent/')  
filedata = open(filename, 'wb')  
ftp.retrbinary('RETR '+filename, filedata.write)  
filedata.close()  
ftp.quit()  

zip_ref = zipfile.ZipFile(filename, 'r')
zip_ref.extractall('ressources/')
zip_ref.close()

file_object = open('ressources/produkt_tu_stunde_20161230_20180702_00150.txt','r')
file_content = file_object.read()

f = open('ressources/produkt_tu_stunde_20161230_20180702_00150.txt','rb')
reader = csv.reader(f,delimiter=';')
dates = []
values = []
for row in reader:
    value = row[3]
    date = row[1]

    dates.append(date)
    values.append(value)
print (dates)
print (values)

