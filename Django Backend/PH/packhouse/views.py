from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse
import mysql.connector
from packhouse.models import PHtemp
import datetime
import requests
import random
from .sample import get_data,send_data  
from .GSR_HR_Model1 import getStressLev
# api-endpoint


GSR_URL = "https://blynk.cloud/external/api/get?token=5NWV5a1K2DhubGrEvz9HIH-XA2jaF2Zx&V1"

HR_URL = "https://blynk.cloud/external/api/get?token=5NWV5a1K2DhubGrEvz9HIH-XA2jaF2Zx&V0"
  
BO_URL = "https://blynk.cloud/external/api/get?token=5NWV5a1K2DhubGrEvz9HIH-XA2jaF2Zx&V5"
  
  


# sending get request and saving the response as response object

# extracting data in json format


# Create your views here.

def readingTimetoIST(MSTTime):
    delay = datetime.timedelta(hours=12, minutes=30)
    ISTtime = MSTTime + delay
    #print(ISTtime)
    return ISTtime

def readingTimetoMST(ISTTime):
    delay = datetime.timedelta(hours=12, minutes=30)
    MSTtime = ISTTime - delay
    #print(ISTtime)
    return MSTtime








def dashboard(request):
    gsr = requests.get(url = GSR_URL)
    hr = requests.get(url = HR_URL)
    bo = requests.get(url=BO_URL)  
    gsrval = gsr.json()
    jsondata = get_data()
    blood_oxy =  []
    gsr_list = []
    hr_list = [] 
    time_list = []
    print("GSR : ",gsrval)
    print("HR", hr.json())
    print("BO",bo.json())
    
    gsrval =  gsrval*(0.21333)
    print(gsrval)
    human_res = (1024 + (2*gsrval))/(512-gsrval)
    print(human_res)
    for obj in jsondata:
        blood_oxy.append(obj['blood_oxy'])
        gsr_list.append(obj['gsr'])
        hr_list.append(obj['heart_rate'])
        time_list.append(str(datetime.datetime.fromtimestamp(obj['time'].timestamp())))

    heart_rate = hr.json()
    human_res = round(human_res,2)
    spo = bo.json()
    # if(heart_rate <50):
    #     heart_rate = random.randint(65,95)
    # if(spo <50):
    #     spo = random.randint(94,100)
    # heart_rate = 80
    # human_res = 5.35
    # send_data(spo,human_res,heart_rate)
    strss = getStressLev(heart_rate,human_res)
    liveTemp = [spo,human_res,heart_rate,strss]
    zipData = zip(blood_oxy, hr_list,time_list)
    data = {
        'externTemp':blood_oxy,
        'PH3TempList':hr_list,
        'stress':strss,
        'liveTemp':liveTemp,
        'realtime': time_list,
        'zipData':zipData
    } 

 
    # print(time_list)
    return render(request, 'PackhouseLogic/dashboard.html', data)

    

