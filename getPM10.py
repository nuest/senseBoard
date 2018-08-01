import requests
import csv
import matplotlib.pyplot as plt
import requests
import math 
import os
import sys
from io import BytesIO
import base64
import datetime
import json
from pyproj import Proj,transform
from math import sin, floor,cos, sqrt, atan2, radians

today = datetime.datetime.now().replace(microsecond=0).isoformat()

def transformToWGS():
    array = []
    with open("ressources/validStations.csv","r") as csv_file:
            reader = csv.reader(csv_file, delimiter=';', quotechar='|')
            for row in reader:
                if not row[6] == '':
                    if float(row[6])>3000000:
                        inProj = Proj(init='epsg:31467')
                    else: 
                        inProj = Proj(init='epsg:31466')
                    outProj = Proj(init='epsg:4326')
                
                    x2,y2=transform(inProj,outProj,row[6],row[7])
                    array.append([row[1],x2,y2])
    return array

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

def getNearest(lat,lon):
    wgsStations = transformToWGS()
    nearestId = 0 
    distance = 50000000000
    for station in wgsStations:
        actualdistance = distance_calc(float(lat),float(lon),float(station[2]),float(station[1]))
        if actualdistance<distance:
            nearestId = station[0]
            distance = actualdistance
    return nearestId


# def subtractMonth(today):
#     current_month= int(today[5:7])
#     current_year = int(today[0:4])
#     rest = today[8:]
#     if current_month==1:
#         year = current_year -1;
#         year = str(year)
#         month=12
#         month=str(month)
#         return  year +'-'+month+'-'+rest
#     else:
#         if current_month<10:
#             month = current_month - 1
#             month = '0'+ str(month)
#         else:
#             month = current_month - 1
#             month = str(month)
#         return  str(current_year) +'-'+month+'-'+rest 



def converTime(date):
    year = date[0:4]
    month = date[5:7]
    day = date[8:10]
    clock = date[11:13]
    result = year + month + day + '00'
    return int(result)
#############################


def daily_mean(dates,value):
    result = list(zip(dates,value))   
    result2 = dict(result) 
    # print(result2)
    dateArray=[]
    aktuellerTag = 0
    counter = -1
    for key in result2:
            wert = result2[key]
            datum = key
            if datum[8:10] == '24':
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

################################

def __luft__():
    id = getNearest(sys.argv[3],sys.argv[4])
    url ="https://www.opengeodata.nrw.de/produkte/umwelt_klima/luftqualitaet/luqs/konti_nach_station/OpenKontiLUQS_"+id+"_aktuell.csv"
    response= requests.get(url)
    f = str(response.content)[2:]
    d = f.split('\\n')
    data = []
    values= []
    dates = []
    for item in d:
        data.append(item.split(';'))
    ## remove header and last quoting char 
    del data[0]
    del data[len(data)-1]
    for item in data[1:]:
        ## remove dots from dates and reverse it for further calculating
        date = item[0].replace('.','')
        date = date[4:]+date[2:4]+date[:2]
        time = item[1].replace(':','')
        date = date + time[:2]
        if(float(date)>= converTime(sys.argv[5]) and float(date)<=converTime(sys.argv[6])):
            if(not item[5][:1]=='<'):
                values.append(int(item[5]))
                dates.append(date)
    return dates,values

def __senseBox__():
        boxId = sys.argv[1]
        phenomenon = sys.argv[2]
        start = sys.argv[5] + 'T00:00:00.000Z'
        end = sys.argv[6] + 'T00:00:00.000Z'
        window = sys.argv[7]
        url = "https://api.opensensemap.org/statistics/descriptive?senseboxid="+boxId+"&phenomenon="+phenomenon+"&from-date="+start+"Z&to-date="+end+"Z&operation=arithmeticMean&window="+window+"&format=json"
        response = requests.get(url)
        res = json.loads(response.content)
        boxData=res[0]
        data=[]
        dates=[]
        for item in boxData.items():
            if not item[0]=='sensorId':
                data.append(int(item[1]))
                dates.append(item[0])
        return dates,data


def __main__():
    bytes = BytesIO()
    senseBoxData = __senseBox__()
    senseBoxData_Dates = senseBoxData[0]
    senseBoxData_Data = senseBoxData[1]
    fig = plt.figure()
    if sys.argv[8]=='true':
        luftData = __luft__()
        if sys.argv[7] == '86400000':
            luftData = daily_mean(luftData[0],luftData[1])
        luftDates = luftData[0]
        luftValues = luftData[1]

        # divider = math.floor(len(luftValues)/10)
        
        # ticks = range(0,len(luftValues)-1,125)
        # labels = []
        # for tick in ticks:
        #     labels.append(luftDates[tick][0:5])
        ax = plt.plot(luftValues,label="Daten Umweltbundesamt")
    bx = plt.plot(senseBoxData_Data,label="Daten senseBox ")
    ##maxarr = [max(senseBoxData),max(luftValues)]
    plt.grid()
    plt.legend()
    plt.xlabel('Datum')
    plt.xticks([0,floor(len(senseBoxData_Data)/4),floor(len(senseBoxData_Data)/2),floor(len(senseBoxData_Data)/1.333),len(senseBoxData_Data)-1],[senseBoxData_Dates[0][:10],senseBoxData_Dates[floor(len(senseBoxData_Data)/4)][:10],senseBoxData_Dates[floor(len(senseBoxData_Data)/2)][:10],senseBoxData_Dates[floor(len(senseBoxData_Data)/1.333)][:10],senseBoxData_Dates[floor(len(senseBoxData_Data)-1)][:10]])
    plt.ylabel('PM10 in µg/m3')
    # plt.xticks(ticks,labels)
    plt.savefig(bytes,format='jpg')
    bytes.seek(0)
    encodedimg = base64.b64encode(bytes.read())
    print(encodedimg)

    return
    

if len(sys.argv)>1:
    try:
        __main__()

    except Exception as identifier:
        print("Error:"+str(identifier))
