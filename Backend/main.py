#Appliction requirements
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from fastapi import FastAPI,Request,HTTPException
from pydantic import BaseModel
from typing import Optional
from joblib import load,dump
#for the ml processes
from data import load_data, encode_target
from models import split_the_data,build_models,fit_models,build_custom_model,permitted_params 
from my_models import save_trained_models,load_trained_models
from evaluation import evaluate_models,retrieve_insights
from feature_selection import feature_selection,keep_top_n



@asynccontextmanager
async def lifespan(app: FastAPI):
    #Load the data
    breast_cancer_wisconsin_diagnostic,X,y = load_data()
    app.state.X = X
    app.state.y =y
    app.state.breast_cancer_wisconsin_diagnostic =breast_cancer_wisconsin_diagnostic
    yield
   

class BaselineRequest(BaseModel):
    PERCENTAGE_SAMPLES_USED_FOR_TESTING: int=20
    selected_model:Optional[str]=None
    build_all: bool=False
    custom:bool=False

class CustomRequest(BaseModel):
    selected_model:str
    hyperparams:dict
    PERCENTAGE_SAMPLES_USED_FOR_TESTING: int=20
    
app = FastAPI(lifespan=lifespan)

app.add_middleware(CORSMiddleware,
                  allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
                  allow_methods=["GET","POST"],
                  allow_headers=["Content-Type"] 
                  )

@app.post("/train/baseline")
def train_baseline(request:Request,body:BaselineRequest):
   X= request.app.state.X
   y = request.app.state.y
   PERCENTAGE_SAMPLES_USED_FOR_TESTING = body.PERCENTAGE_SAMPLES_USED_FOR_TESTING
   selected_model = body.selected_model
   build_all = body.build_all
   custom= body.custom 
   X_train,X_test,y_train,y_test = split_the_data(X,y,PERCENTAGE_SAMPLES_USED_FOR_TESTING)      
   model_output = build_models(selected_model, build_all,custom)
   trained_models = fit_models(model_output,X_train,y_train)
   save_models =save_trained_models(trained_models,X_test,y_test,X_train,y_train) 
   return {"status":"trained and saved"}


@app.post("/train/custom")
def train_custom(request:Request,body:CustomRequest):
   X= request.app.state.X
   y = request.app.state.y
   hyperparams = body.hyperparams 
   PERCENTAGE_SAMPLES_USED_FOR_TESTING = body.PERCENTAGE_SAMPLES_USED_FOR_TESTING
   selected_model = body.selected_model
   X_train,X_test,y_train,y_test = split_the_data(X,y,PERCENTAGE_SAMPLES_USED_FOR_TESTING)      
   model= build_custom_model(selected_model,hyperparams)
   trained_custom_model = fit_models(model,X_train,y_train)
   save_models =save_trained_models(trained_custom_model,X_test,y_test,X_train,y_train) 
   return {"status":"trained and saved"}

@app.get("/models")
def getparams():
    return permitted_params

@app.get("/evaluation")
def evaluation(filename: str="savedmodels.pkl"):
    load_models=load_trained_models(filename)
    evaluation = evaluate_models(load_models["trained_models"],load_models["X_test"],load_models["y_test"])
    insights = retrieve_insights(load_models["trained_models"])
    return {"results":evaluation,"insights":insights}


@app.post("/features/top_n")
def top_features(n:int=10,save_features:bool=False,retrain:bool=False):
    load_models=load_trained_models()
    sorted_scores=feature_selection(load_models["X_train"],load_models["y_train"])
    features_to_keep,features_scores,X_train,X_test = keep_top_n(sorted_scores,n,load_models["X_train"],load_models["X_test"])
    if save_features==True:
        with open("saved_features.pkl","wb") as top_n:
          dump(features_to_keep,top_n)
    if retrain==True:
        top_nmodel= fit_models(load_models["trained_models"],X_train,load_models["y_train"]) #a fitted model can be refitted with new data without resolving to default
        save_top= save_trained_models(top_nmodel,X_test,load_models["y_test"],X_train,load_models["y_train"],filename="topnmodels.pkl")
    return {"top_features":features_to_keep,"feature_scores":features_scores}        
          
    






