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
today = datetime.datetime.now().replace(microsecond=0).isoformat()
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
def converTime(date):
    year = date[0:4]
    month = date[5:7]
    day = date[8:10]
    clock = date[11:13]
    result = year + month + day
    return int(result)
# def __luft__():
#     day= 86400 
#     daysback = 30
#     counter = 0 
#     starting = 1531864800  - day*daysback
#     ending = 1531951200
#     data = []
#     dates = []
#     ranging=str(starting)+','+str(ending)
#     url ="https://www.umweltbundesamt.de/uaq/csv/stations/data?station[]=DENW095&pollutant[]=PM10&scope[]=1TMW&group[]=pollutant&range[]="+ranging
#     response= requests.get(url)
#     f = str(response.content)
#     reader = csv.reader([f[2:]],delimiter=';')
#     for row in reader:
#         for item in row:
#             if(item[0].isdigit()):
#                 if (item[3]=='n'):
#                     value= float(item[0:2])
#                     data.append(value)
#                 else:
#                     dates.append(item)
#     return data,dates
def __luft__():
    url ="https://www.opengeodata.nrw.de/produkte/umwelt_klima/luftqualitaet/luqs/konti_nach_station/OpenKontiLUQS_MSGE_aktuell.csv"
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
        if(float(date)>= converTime(sys.argv[5]) and float(date)<=converTime(sys.argv[6])):
            if(not item[5][:1]=='<'):
                values.append(int(item[5]))
                dates.append(date)
    return values,dates

def __senseBox__():
        boxId = sys.argv[1]
        phenomenon = sys.argv[2]
        start = sys.argv[5] + 'T00:00:00.000Z'
        end = sys.argv[6] + 'T00:00:00.000Z'
        url = "https://api.opensensemap.org/statistics/descriptive?senseboxid="+boxId+"&phenomenon="+phenomenon+"&from-date="+start+"Z&to-date="+end+"Z&operation=arithmeticMean&window=3600000&format=json"
        response = requests.get(url)
        res = json.loads(response.content)
        boxData=res[0]
        data=[]
        dates=[]
        for item in boxData.items():
            if not item[0]=='sensorId':
                data.append(int(item[1]))
                dates.append(item[0])
        return data,dates


def __main__():
    bytes = BytesIO()
    senseBoxData = __senseBox__()
    senseBoxData_Data = senseBoxData[0]
    senseBoxData_Dates = senseBoxData[1]
    luftData = __luft__()
    luftValues = luftData[0]
    luftDates = luftData[1]
    divider = math.floor(len(luftValues)/10)

    ticks = range(0,len(luftValues)-1,125)
    labels = []
    for tick in ticks:
        labels.append(luftDates[tick][0:5])
    fig = plt.figure()
    bx = plt.plot(senseBoxData_Data,label="Daten senseBox ")
    ax = plt.plot(luftValues,label="Daten Umweltbundesamt")
    axes = plt.gca()
    axes.set_ylim([0,max(senseBoxData_Data)])
    plt.grid()
    plt.legend()
    plt.xlabel('Datum')
    plt.ylabel('PM10 in µg/m3')
    # plt.xticks(ticks,labels)
    plt.savefig(bytes,format='jpg')
    bytes.seek(0)
    encodedimg = base64.b64encode(bytes.read())
    print(encodedimg)

    return
    

if len(sys.argv)>1:
    __main__()
