import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import smtplib, ssl
import time


sender_email = "swayamswastha@gmail.com"
password = "usvvtpjbvkzcpgno"

server = smtplib.SMTP('smtp.gmail.com',587)
server.ehlo()
server.starttls() # Secure the connection
server.ehlo()
server.login(sender_email, password)






cred = credentials.Certificate("serviceAccountKey.json")


firebase_admin.initialize_app(cred, {
    'databaseURL': "https://mega-project-475de-default-rtdb.firebaseio.com"

})




while(True):

   
  
    ref = db.reference('/devices')
    bpm_val = ref.get()
    # print(bpm_val['5046323e'])
    # print(bpm_val['a87f6fb5'])
    criticalVal =bpm_val['5046323e']['criticalLower']
    criticalUp = bpm_val['5046323e']['criticalUpper']
    data  = bpm_val['5046323e']['data']
    devList = ['5046323e']
    for k in devList:
        if(int(data)<int(criticalVal) or int(data)>int(criticalUp)):
                    
            emailid = bpm_val[k]['patient_email']
            docemail = bpm_val[k]['doctor_email']
            subject = "Alert From SWAYAM SWASTHA !! "
            body =  str(bpm_val[k]['deviceName']) +  ' Recorded value beyond threshold is  : ' + str(data) 
            msg = f"Subject:{subject}\n\n{body}"
            print("SENT")
            server.sendmail(sender_email, emailid, msg)
            server.sendmail(sender_email, docemail, msg)
            time.sleep(300)

        # for n in dict_patient:
        #     if(dict_patient[n]['email']!=""):
      

    print("SLEEP")
    time.sleep(1)



server.quit()

