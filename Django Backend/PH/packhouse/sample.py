import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pyrebase
import datetime

# Use the application default credentials.
firebaseConfig = {
  'apiKey': "AIzaSyDwChL454StZoSAypZnbveq24ayvg5YCjQ",
  'authDomain': "mega-project-475de.firebaseapp.com",
  'databaseURL': "https://mega-project-475de-default-rtdb.firebaseio.com",
  'projectId': "mega-project-475de",
  'storageBucket': "mega-project-475de.appspot.com",
  'messagingSenderId': "537779729284",
  'appId': "1:537779729284:web:1dcbc1168b17d66d03a3d1",
  'measurementId': "G-G0K8F5YKN7"
}




firebase = pyrebase.initialize_app(firebaseConfig)
authn = firebase.auth()

cred = credentials.Certificate("serviceAccountKey.json")

firebase_admin.initialize_app(cred)

db = firestore.client()

def get_data():

    result = db.collection('readings')

    docs = result.stream()
    readingsData = []
    for doc in docs:
        ob = doc.to_dict()
        readingsData.append(ob)
    
    print(readingsData)
    return readingsData

def send_data(bo,g,hr):
    
    data = {
        'blood_oxy' : bo,
        'gsr':g,
        'heart_rate':hr,
        'time':datetime.datetime.now()
    }
    db.collection(u'readings').document().set(data)

