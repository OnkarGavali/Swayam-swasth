from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import StratifiedKFold
from sklearn.model_selection import GridSearchCV 
import xgboost as xgb
from xgboost.sklearn import XGBClassifier
from sklearn.metrics import average_precision_score
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
from scipy import signal 
import pickle
import sklearn.metrics
from sklearn.model_selection import cross_val_score
from sklearn import svm
import numpy as np
import pandas as pd
from sklearn.metrics import precision_recall_fscore_support 

dataframe_hrv = pd.read_csv("SaYoPillow.csv")
print(dataframe_hrv)
selected_x_columns = ['bo','hr']

X = dataframe_hrv[selected_x_columns]
y = dataframe_hrv['sl']

x_train, x_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)
model = XGBClassifier()
model.fit(x_train, y_train)

column_names = ['bo','hr']
matrix = [[96.9,136]]
inp = pd.DataFrame(matrix, columns=column_names)
print(inp)

y_pred = model.predict(inp)

res = ""
if(y_pred[0]==0):
    res = "Stress Level - No Stress"
if(y_pred[0]==1):
    res = "Stress Level - Very Low"
if(y_pred[0]==2):
    res = "Stress Level - Low"
if(y_pred[0]==3):
    res = "Stress Level - Medium "
if(y_pred[0]==4):
    res = "Stress Level - High"
print(res)

y_pred = model.predict(x_test)
from sklearn.metrics import accuracy_score
# score of the model
auprc = accuracy_score(y_test, y_pred)

print("Accuracy",auprc)
cm = confusion_matrix(y_test, y_pred)

