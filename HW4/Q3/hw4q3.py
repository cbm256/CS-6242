## Data and Visual Analytics - Homework 4
## Georgia Institute of Technology
## Applying ML algorithms to detect seizure

import numpy as np
import pandas as pd
import time

from sklearn.model_selection import cross_val_score, GridSearchCV, cross_validate, train_test_split
from sklearn.metrics import accuracy_score, classification_report
from sklearn.svm import SVC
from sklearn.linear_model import LinearRegression
from sklearn.neural_network import MLPClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, normalize

######################################### Reading and Splitting the Data ###############################################
# XXX
# TODO: Read in all the data. Replace the 'xxx' with the path to the data set.
# XXX
data = pd.read_csv('seizure_dataset.csv')

# Separate out the x_data and y_data.
x_data = data.loc[:, data.columns != "y"]
y_data = data.loc[:, "y"]

# The random state to use while splitting the data.
random_state = 100

# XXX
# TODO: Split 70% of the data into training and 30% into test sets. Call them x_train, x_test, y_train and y_test.
# Use the train_test_split method in sklearn with the paramater 'shuffle' set to true and the 'random_state' set to 100.
# XXX
x_train, x_test, y_train, y_test = train_test_split(x_data, y_data, test_size=0.3, train_size=0.7, random_state=random_state, shuffle=True)

# ############################################### Linear Regression ###################################################
# XXX
# TODO: Create a LinearRegression classifier and train it.
# XXX
regr = LinearRegression().fit(x_train, y_train)
y_predict = regr.predict(x_test).round()
y_train_predict = regr.predict(x_train).round()

# XXX
# TODO: Test its accuracy (on the training set) using the accuracy_score method.
# TODO: Test its accuracy (on the testing set) using the accuracy_score method.
# Note: Use y_predict.round() to get 1 or 0 as the output.
# XXX
print('Linear Regression accuracy score for training is {}'.format(accuracy_score(y_train,y_train_predict)))
print('Linear Regression accuracy score for test is {}'.format(accuracy_score(y_test,y_predict)))
print('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n')

# ############################################### Multi Layer Perceptron #################################################
# XXX
# TODO: Create an MLPClassifier and train it.
# XXX
mlpc = MLPClassifier().fit(x_train,y_train)
y_predict_mlp = mlpc.predict(x_test)
y_train_predict_mlp = mlpc.predict(x_train)

# XXX
# TODO: Test its accuracy on the training set using the accuracy_score method.
# TODO: Test its accuracy on the test set using the accuracy_score method.
# XXX
print('MLP accuracy score for training is {}'.format(accuracy_score(y_train,y_train_predict_mlp)))
print('MLP accuracy score for test is {}'.format(accuracy_score(y_test,y_predict_mlp)))
print('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n')


# ############################################### Random Forest Classifier ##############################################
# XXX
# TODO: Create a RandomForestClassifier and train it.
# XXX
rf = RandomForestClassifier(random_state=random_state)
rf.fit(x_train,y_train)
y_predict_rf = rf.predict(x_test)
y_train_predict_rf = rf.predict(x_train)

# XXX
# TODO: Test its accuracy on the training set using the accuracy_score method.
# TODO: Test its accuracy on the test set using the accuracy_score method.
# XXX
print('Random Forest accuracy score for training is {}'.format(accuracy_score(y_train,y_train_predict_rf)))
print('Random Forest accuracy score for test is {}'.format(accuracy_score(y_test,y_predict_rf)))
print('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n')
# XXX
# TODO: Tune the hyper-parameters 'n_estimators' and 'max_depth'.
#       Print the best params, using .best_params_, and print the best score, using .best_score_.
# XXX
rf_cv = RandomForestClassifier(random_state=random_state)
rf_parameters = {'max_depth':[100,150,200],'n_estimators':[20,30,40]}
rf_clf = GridSearchCV(rf_cv, rf_parameters, cv=10)
rf_clf.fit(x_train,y_train)

print('Best parameters for random forest classifier is {}'.format(rf_clf.best_params_))
print('Best CV score for random forest classifier is {}'.format(rf_clf.best_score_))
y_predict_rf_clf = rf_clf.best_estimator_.predict(x_test)
print('new random forest test data accuracy score after grid search is {}'.format(accuracy_score(y_test,y_predict_rf_clf)))
print('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n')

# ############################################ Support Vector Machine ###################################################
# XXX
# TODO: Pre-process the data to standardize or normalize it, otherwise the grid search will take much longer
# TODO: Create a SVC classifier and train it.
# XXX
scaler = StandardScaler()
x_train = scaler.fit(x_train).transform(x_train)
x_test = scaler.fit(x_test).transform(x_test)

svclassifier = SVC(random_state=random_state)
svclassifier.fit(x_train, y_train)

y_predict_sv = svclassifier.predict(x_test)
y_train_predict_sv = svclassifier.predict(x_train)

# XXX
# TODO: Test its accuracy on the training set using the accuracy_score method.
# TODO: Test its accuracy on the test set using the accuracy_score method.
# XXX
print('SVM accuracy score for training is {}'.format(accuracy_score(y_train,y_train_predict_sv)))
print('SVM accuracy score for test is {}'.format(accuracy_score(y_test,y_predict_sv)))
print('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n')
# XXX
# TODO: Tune the hyper-parameters 'C' and 'kernel' (use rbf and linear).
#       Print the best params, using .best_params_, and print the best score, using .best_score_.
# XXX
svc_cv = SVC(random_state=random_state)
svc_parameters = {'C':[.1,1,10],'kernel':['rbf','linear']}
svc_grid = GridSearchCV(svc_cv, svc_parameters, cv=10)
svc_grid.fit(x_train,y_train)

print('Best parameters for SVM is {}'.format(svc_grid.best_params_))
print('Best CV score for SVM is {}'.format(svc_grid.best_score_))
y_predict_svc_grid = svc_grid.best_estimator_.predict(x_test)
print('new testing score after grid search is {}'.format(accuracy_score(y_test,y_predict_svc_grid)))

best_index = svc_grid.best_index_

print('CV mean fit time for best estimator is {}'.format(svc_grid.cv_results_['mean_fit_time'][best_index]))
print('CV mean train score for best estimator is {}'.format(svc_grid.cv_results_['mean_train_score'][best_index]))
print('CV mean test score for best estimator is {}'.format(svc_grid.cv_results_['mean_test_score'][best_index]))