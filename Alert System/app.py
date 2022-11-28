import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import smtplib, ssl

# smtp_server = "smtp.gmail.com"
# port = 587  # For starttls
# sender_email = "swayamswastha@gmail.com"
# password = "Swayam@123"

# # Create a secure SSL context
# context = ssl.create_default_context()
# server = smtplib.SMTP(smtp_server,port)
# server.ehlo() # Can be omitted
# server.starttls(context=context) # Secure the connection
# server.ehlo() # Can be omitted
# server.login(sender_email, password)
# server.sendmail(sender_email, "sarnobatadi@gmail.com", "TEST")

# smtp_server = "smtp.mail.yahoo.com"
# port = 587  # For starttls
sender_email = "swayamswastha@gmail.com"
password = "usvvtpjbvkzcpgno"

server = smtplib.SMTP('smtp.gmail.com',587)
server.ehlo()
server.starttls() # Secure the connection
server.ehlo()
server.login(sender_email, password)
subject = "Alert From SWAYAM SWASTHA !! "
body = 'Heart Rate for your Patient was observed outside threshold contact Doctors !! '
msg = f"Subject:{subject}\n\n{body}"





cred = credentials.Certificate("serviceAccountKey.json")


firebase_admin.initialize_app(cred, {
    'databaseURL': "https://mega-project-475de-default-rtdb.firebaseio.com"

})

ref = db.reference('/devices')
dict_patient = ref.get()
for n in dict_patient:
    # print(n)
    if(dict_patient[n]['email']!=""):
        print(dict_patient[n]['email'])
        emailid = dict_patient[n]['email']
        server.sendmail(sender_email, emailid, msg)



server.quit()

