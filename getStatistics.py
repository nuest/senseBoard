import sys
import os
from os.path import isfile, join
import zipfile
from ftplib import FTP
import csv
if(len(sys.argv)>1):
    import matplotlib.pyplot as plt
    import matplotlib.image as mpimg
import base64

import requests
import csv
import json
from io import BytesIO
import datetime
from math import sin, floor,cos, sqrt, atan2, radians
import glob

    # fig = plt.figure()
    # plt.plot(values)
    # pic = fig.savefig('test.png')
    # img = mpimg.imread('test.png')
    # with open('test.png',"rb") as imageFile:
    #     str = base64.b64encode(imageFile.read())
    #     print (str)
####################
today = datetime.datetime.now().replace(microsecond=0).isoformat()

### Function that takes 2 arrays recognizes values with the same day and averages that day 
### returns 2 arrays , one array with all the days and one with the averaged value of that day 

def daily_mean(dates,value):
    result = list(zip(dates,value))   
    result2 = dict(result) 
    dateArray=[]
    aktuellerTag = 0
    counter = -1
    # print(result2)
    for key in result2:
            wert = result2[key]
            datum = key
            if datum[8:10] == '00':
                aktuellerTag = datum[:8]
                dateArray.append([datum[:8],wert])
                counter = counter + 1 
            if datum[:8] == aktuellerTag:
                dateArray[counter].append(float(wert))
    for item in dateArray:
        ## Duplicate gets removed 
        del item[1]
    #     del item[0]
    averageArray = []
    datesArray = []
    for item in dateArray:
        sum = 0
        for items in item[:1]:
            datesArray.append(items)
        for items in item[1:]:
            sum = sum + items
        averageArray.append(sum/(len(item)-1))
    return(datesArray,averageArray)

def distance_calc(lat1,lon1,lat2,lon2):
    # approximate radius of earth in km
    R = 6373.0

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance
######################
def nearestID(lat,lon):
    title = sys.argv[2]
    if(title=='Temperatur'):
        title='TU'
    if(title=='Luftdruck'):
        title='P0'
    filename='/home/eric/Documents/Bachelorarbeit/senseboard_backend/senseBoard/ressources/stationen'+title+'.csv'
    f = open(filename,'rb')
    reader = csv.reader(f,delimiter=',')
    ids = []
    lats = []
    lons = []
    data = []
    ## Open corresponding csv file and loop through each to get an array with all stations and their respective coordinates
    with open(filename, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',', quotechar='|')
        for row in reader:
            id = row[0]
            late = row[3]
            lone = row[4]
            
            if row[2] == '20180713' or row[2]=="20180716":
                ids.append(id)
                lats.append(late)
                lons.append(lone)

    ### Loop through array and calculate each distance , give out id with the smallest distance 
    data.append(ids)
    data.append(lats)
    data.append(lons)
    nearestID=0
    distance = 50000000
    for i in range(len(data[0])):
        id = data[0][i]
        late =float(data[1][i])
        lone = float(data[2][i])
        if distance>distance_calc(float(lat),float(lon),late,lone):
            distance = distance_calc(float(lat),float(lon),late,lone)
            nearestID=id
    ## Getting to the right format again
    while not len(nearestID)==5:
        nearestID='0'+nearestID
    return nearestID,distance

def subtractMonth(today):
    current_month= int(today[5:7])
    current_year = int(today[0:4])
    rest = today[8:]
    if current_month==1:
        year = current_year -1;
        year = str(year)
        month=12
        month=str(month)
        return  year +'-'+month+'-'+rest
    else:
        if current_month<10:
            month = current_month - 1
            month = '0'+ str(month)
        else:
            month = current_month - 1
            month = str(month)
        return  str(current_year) +'-'+month+'-'+rest 
######################################
def converTime(date):
    year = date[0:4]
    month = date[5:7]
    day = date[8:10]
    clock = date[11:13]
    result = year + month + day +"00"
    return int(result)
#######################
def __senseBox__():
        boxId = sys.argv[1]
        phenomenon = sys.argv[2]
        start = sys.argv[5] + 'T00:00:00.000Z'
        end = sys.argv[6] + 'T00:00:00.000Z'
        window = sys.argv[7] 
        url = "https://api.opensensemap.org/statistics/descriptive?senseboxid="+boxId+"&phenomenon="+phenomenon+"&from-date="+start+"&to-date="+end+"&operation=arithmeticMean&window="+window+"&format=json"
        response = requests.get(url)
        res = json.loads(response.content)
        boxData=res[0]
        data=[]
        dates=[]
        for item in boxData.items():
            if not item[0]=='sensorId':
                data.append(item[1])
                dates.append(item[0])
        return data,dates


#####################################################
def __DWD__():
    id_result  = nearestID(sys.argv[3],sys.argv[4])
    stationID = id_result[0]
    distance = id_result [1]
    phenomenon = sys.argv[2] 
    title=''
    prefix=''
    if(phenomenon=='Temperatur'):
        title = '/air_temperature'
        prefix='TU'
    if(phenomenon=='Luftdruck'):
        prefix='P0'
        title = '/pressure'
    ## Bauen des Paths 
    path = "/home/eric/Documents/Bachelorarbeit/senseboard_backend/senseBoard/data/"+stationID+"_"+prefix
    if not os.path.exists(path):
        os.mkdir(path)
        #### Logging in to the ftp - server ######
    filename = 'stundenwerte_'+prefix+'_'+stationID+'_akt.zip'
    ftp = FTP('ftp-cdc.dwd.de')  
    ftp.login()  
    #### Dirceting to the correct sub folder and retrieve the file 
    folder = 'pub/CDC/observations_germany/climate/hourly'+title+'/recent/'
    ftp.cwd(folder)  
    filedata = open(filename, 'wb')  

    ftp.retrbinary('RETR '+filename, filedata.write)  
    filedata.close()  
    ftp.quit()  
        #### Unzip the just downloaded file to ressources/
    zip_ref = zipfile.ZipFile(filename, 'r')
    zip_ref.extractall(path)
    os.remove('/home/eric/Documents/Bachelorarbeit/senseboard_backend/senseBoard/'+filename)
    zip_ref.close()
    ####  fetch the correct file 
    onlyfiles = [f for f in os.listdir(path) if isfile(join(path, f))]
    for filenames in onlyfiles:
        if filenames.startswith('produkt'):
            file = filenames
        else:
            os.remove(path+'/'+filenames)
    ##### Read csv and extract data for further plotting
    dates = []
    values = []
    buffer = 0 
    if sys.argv[7] == '86400000':
        buffer = 100
    with open(path+'/'+file, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=';', quotechar='|')
        for row in reader:
            value = row[3]
            date = row[1]
            if not date == 'MESS_DATUM':
                if float(date)>=converTime(sys.argv[5]) and float(date)<converTime(sys.argv[6])+buffer:  
                    dates.append(date)          
                    if not value == 'TT_TU':
                        value_new = float(value.strip())
                        values.append(value_new)
    # delete files that were downloaded 
    os.remove(path+'/'+file)
    os.rmdir(path)
    return (dates,values,distance) 

def __main__():
    bytes = BytesIO()
    senseBoxData = __senseBox__()[0]
    senseBoxDatum = __senseBox__()[1]
    dates = __senseBox__()[1]
    # ticks = range(0,len(dates),floor(len(senseBoxData)/10))
    # labels=[]
    # for tick in ticks:
    #     labels.append(dates[tick][5:10])
    fig = plt.figure()
    if sys.argv[8]=='true':   
        dwdData = __DWD__()
        if sys.argv[7] == '86400000':
            dwdData = daily_mean(dwdData[0],dwdData[1])
            del senseBoxDatum[len(senseBoxDatum)-1]
            del senseBoxData[len(senseBoxData)-1]
        ax = plt.plot(senseBoxData,label="senseBox")
        bx = plt.plot(dwdData[1],label="DWD")
        # print(len(senseBoxDatum),len(dwdData[0]))
        dates =[]
        for item in senseBoxDatum:
            dates.append(converTime(item))
        plt.grid()
        plt.legend()
        plt.xlabel('Datum')
        plt.xticks([0,floor(len(senseBoxData)/4),floor(len(senseBoxData)/2),floor(len(senseBoxData)/1.333),len(senseBoxData)-1],[senseBoxDatum[0][:10],senseBoxDatum[floor(len(senseBoxData)/4)][:10],senseBoxDatum[floor(len(senseBoxData)/2)][:10],senseBoxDatum[floor(len(senseBoxData)/1.333)][:10],senseBoxDatum[floor(len(senseBoxData)-1)][:10]])
        plt.ylabel(sys.argv[2])
        # plt.xticks(ticks,labels)
        plt.savefig(bytes,format='jpg')
    else:
        plt.plot(senseBoxData)
        plt.xticks([0,floor(len(senseBoxData)/4),floor(len(senseBoxData)/2),floor(len(senseBoxData)/1.333),len(senseBoxData)-1],[senseBoxDatum[0][:10],senseBoxDatum[floor(len(senseBoxData)/4)][:10],senseBoxDatum[floor(len(senseBoxData)/2)][:10],senseBoxDatum[floor(len(senseBoxData)/1.333)][:10],senseBoxDatum[floor(len(senseBoxData)-1)][:10]])
        plt.grid()
        plt.xlabel('Datum')
        plt.ylabel(sys.argv[2])
        # plt.xticks(ticks,labels)
        plt.savefig(bytes,format='jpg')
    bytes.seek(0)
    encodedimg = base64.b64encode(bytes.read())
    print(encodedimg)
    print("Maximalwert : "+ str(max(senseBoxData)))
    print("Minimalwert : "+ str(min(senseBoxData)))
   # if sys.argv[8] =='true':
        # print("Distanz zur DWD Station :"+str(dwdData[2])+" km")
    
    return

if len(sys.argv)>1:
    try:
        __main__()

    except Exception as identifier:
        print("Error:"+str(identifier))
    # __analyse__()
###################################


