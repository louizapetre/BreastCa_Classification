##Saving and loading models from memmory 
from fastapi import HTTPException
from joblib import dump , load

def save_trained_models(trained_models,X_test,y_test,X_train,y_train,filename="savedmodels.pkl"):
    if not isinstance(trained_models,list):
        trained_models= [trained_models]
    saved_objects ={"trained_models":trained_models,"X_test":X_test,"y_test":y_test,"X_train":X_train,"y_train":y_train}    
    with open(filename,"wb") as models:
        dump(saved_objects,models,protocol=5) 


def load_trained_models(filename="savedmodels.pkl"):
   try:
        with open(filename, "rb") as models:
            trained_models=load(models)
            return trained_models
   except FileNotFoundError:
        raise HTTPException(status_code=404,detail="Train or Retreain a model first") 
    