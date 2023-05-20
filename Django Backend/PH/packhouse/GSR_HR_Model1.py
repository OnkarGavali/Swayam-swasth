from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import StratifiedKFold
from sklearn.model_selection import GridSearchCV 
import xgboost as xgb
from .stress import getStressLevel
from xgboost.sklearn import XGBClassifier
from sklearn.metrics import average_precision_score
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
from scipy import signal 
import pickle
from sklearn.neighbors import KNeighborsClassifier
import sklearn.metrics
from sklearn.model_selection import cross_val_score
from sklearn import svm
import numpy as np
import pandas as pd
from sklearn.metrics import precision_recall_fscore_support 


def getStressLev(heart_rate, hand_gsr):

    dataframe_hrv = pd.read_csv("dataframe_hrv.csv")
    print(dataframe_hrv)
    def fix_stress_labels(df='',label_column='stress'):
        df['stress'] = np.where(df['stress']>=0.5, 1, 0)
        print(df["stress"].unique())
        return df


    def missing_values(df):

        df['HR'].fillna((df['HR'].mean()), inplace=True)
        df['HR'] = signal.medfilt(df['HR'],13) 
    #     df.plot( y=["HR"])

        return df



    dataframe_hrv = fix_stress_labels(df=dataframe_hrv)
    dataframe_hrv = missing_values(dataframe_hrv)
    print(dataframe_hrv)

    selected_x_columns = ['HR','handGSR']

    X = dataframe_hrv[selected_x_columns]
    X['HR'].fillna((X['HR'].mean()), inplace=True)
    X['handGSR'].fillna((X['handGSR'].mean()), inplace=True)
    # X['footGSR'].fillna((X['footGSR'].mean()), inplace=True)

    y = dataframe_hrv['stress']




    hr = 78
    gsr = 2.12
    stress_level = getStressLevel(hr,gsr)
    res = ""
    if(stress_level==0):
        res = "Normal"
    if(stress_level==1):
        res = "Very Low "
    if(stress_level==2):
        res = "Low"
    if(stress_level==3):
        res = "Moderately Low"
    if(stress_level==4):
        res = "Moderate"
    if(stress_level==5):
        res = "Moderately High"
    if(stress_level==6):
        res = "High"
    if(stress_level==7):
        res = "Very High"
    if(stress_level==8):
        res = "Extreame"
    if(stress_level==9):
        res = "Danger"

    print(res)






    from sklearn.neighbors import KNeighborsRegressor


    x_train, x_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 5)
    model = KNeighborsRegressor(n_neighbors = 5)
    model.fit(x_train, y_train)
    print(x_test)
    column_names = ['HR', 'handGSR']
    # matrix = [[hr,gsr]]
    # inp = pd.DataFrame(matrix, columns=column_names)
    print(inp)
    print(x_test)
    y_pred = model.predict([[heart_rate,hand_gsr]])
    print(y_pred)
    return y_pred[0]
    # core of the model
    auprc = average_precision_score(y_test, y_pred)
    print("Accuracy : ",auprc)

    cm = confusion_matrix(y_test, y_pred)
    print(cm)


# getStressLev(90,5.35,1.35)