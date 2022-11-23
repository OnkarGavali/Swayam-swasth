import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("serviceAccountKey.json")


firebase_admin.initialize_app(cred, {
    'databaseURL': "https://mega-project-475de-default-rtdb.firebaseio.com"

})

ref = db.reference('/Patient')
dict_patient = ref.get()
print(dict_patient['BPM'])