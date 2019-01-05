
from flask import Flask,render_template, request,json
from sklearn.externals.joblib import dump, load
import numpy as np
import pandas as pd
#from datetime import datetime

import os

app = Flask(__name__)
app.config['TESTING'] = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

#settings.py
# __file__ refers to the file settings.py 
ROOT = os.path.dirname(os.path.abspath(__file__))   # refers to application_top
STATIC = os.path.join(ROOT, 'static')

path=os.path.join(STATIC, 'gnb.joblib')



filename="D:\Semester1\DVA\Project\static\gnb.joblib"
#model=load(filename)
model=load(path)

@app.route('/')
def client():
    return render_template('index.html')

@app.route('/get_pred', methods=['POST'])
def get_pred():
    date =  request.form['date'];
    time =request.form['time']
#    print("date",date)
#    print("time",time)
#    print(type(date))    
    print (path)
    date_obj={}
    time_obj={}
    try:
#        date_obj = datetime.strptime('2018-08-31T02:33', "%Y-%m-%dT%H:%M")
        date_obj = pd.datetime.strptime(date, "%m/%d/%Y")
        time_obj= pd.datetime.strptime(time,'%I:%M  %p')
#        print(date_obj)
#        print(time_obj)
#        print(date_obj.year)
#        print(date_obj.day)
#        print(date_obj.month)
#        print(date_obj.weekday())
#        print(date_obj.hour)
#        print(int(date_obj.hour/4))
    except ValueError as e:
        print("Incorrect data format, ValueError:", str(e))
    
    
    try:
#        print("inside try block")
        X_test = pd.DataFrame(columns=['day', 'month','hour','dayofweek','ward','hour_slot'])
    #        print ("empty x test",X_test)
#        X_test.loc[0] = [2004,  1,  1,  0,  3,  7,  0]
        X_test.loc[0] = [date_obj.day,  date_obj.month,  time_obj.hour,  date_obj.weekday(), 1,  int(time_obj.hour/4)]
    #        print ("orig ",X_test)
        X_test=X_test.append([X_test]*49, ignore_index=True)
    #        print ("after append ",X_test)
        X_test['ward']=range(1,51)
#        print ("range", X_test)
    
#        result = model.predict(X_test)
#        print ('class', result)
        y_prob = model.predict_proba(X_test) # get the probabilites of classes
#        print("-------------------------------------",y_prob)
        yp = pd.DataFrame(y_prob)
        yp = yp.div(0.9*yp.sum(axis=1), axis=0) + 0.1 # normalize to range [0.1, 1.0]
        y_prob = yp.values # new list of probabilities
#        print("-------------------------------------",y_prob)
        
        
        pred_df = X_test.copy()
        pred_df[['theft', 'other_offenses', 'child_offense', 'sexual_crime', 'vehicle_theft', 'deceptive_practice', 'assault', 'narcotics', 'criminal_damage']]\
        = pd.DataFrame(y_prob, index= pred_df.index)
#        print ("-------------OUTPUT DF---------------")
#        print (pred_df)
        
        csv_path=os.path.join(STATIC, 'res\output.csv')
        print("csv_path - ",csv_path)
        pred_df.to_csv(csv_path,index=False)
        
        json_obj = json.dumps({'status':'OK','csv_path':csv_path,'result':pred_df.to_json(orient='records')})
#        print("........JSON..........",json_obj)
    
        return json_obj
        
    except (RuntimeError, TypeError, NameError) as e:
#        print("inside except block")
        print("Error occured : ",str(e))
        return json.dumps({'status':'BAD','result':{}});

if __name__=='__main__':
    app.run()