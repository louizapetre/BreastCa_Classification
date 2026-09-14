import pandas as pd
from ucimlrepo import fetch_ucirepo

def load_data():
    breast_cancer_wisconsin_diagnostic = fetch_ucirepo(id=17) 
    X = breast_cancer_wisconsin_diagnostic.data.features 
    y = breast_cancer_wisconsin_diagnostic.data.targets 
    return breast_cancer_wisconsin_diagnostic,X,y


def view_the_data(data,X,y):
    ''' Optional setting to view data details before processing or training a model/models
    '''
    breastca_data = X.join(y,on=None, how='left', lsuffix='', rsuffix='', sort=False, validate=None)
    counts_y = y['Diagnosis'].value_counts()
    return len(breastca_data), data.variables, counts_y

def encode_target(y):
    ''' Mapping benign and malignant tumor types to 1 and 0 and transforming the y column to a list for modeld training at later stages
    '''
    y_copy = y.copy()
    y_map ={'M':1,'B':0}
    y_copy['Diagnosis'] = y_copy['Diagnosis'].map(y_map)
    y_copy= y_copy.values.ravel()
    return y_copy

if __name__ == "__main__":
    breast_cancer_wisconsin_diagnostic,X,y = load_data()
    print(view_the_data(breast_cancer_wisconsin_diagnostic,X,y)[0])
    print(encode_target(y))
    print("Executed successfully")