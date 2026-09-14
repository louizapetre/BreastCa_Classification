#importing the models 
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import MultinomialNB
from data import load_data ,encode_target



#Splitting the data 
def split_the_data(X,y,PERCENTAGE_SAMPLES_USED_FOR_TESTING):
    y= encode_target(y)
    if PERCENTAGE_SAMPLES_USED_FOR_TESTING <=0 or PERCENTAGE_SAMPLES_USED_FOR_TESTING>=100:
        PERCENTAGE_SAMPLES_USED_FOR_TESTING = 20
    test_size= PERCENTAGE_SAMPLES_USED_FOR_TESTING/100 
    X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=test_size)
    return X_train,X_test,y_train,y_test

##building the models 

def build_models(selected_model, build_all=False,custom = False,hyperparams=None):

    classifiers = {
        "Logistic Regression":LogisticRegression,
        "Decision Tree":DecisionTreeClassifier,
         "Random Forest" :RandomForestClassifier,
        "K-Nearest Neighbors":KNeighborsClassifier,
        "Multinomial Naive Bayes":MultinomialNB
    }

    if build_all:
        models = [classifier() for classifier in classifiers.values()]

        for m in models:
            if isinstance(m, LogisticRegression):
                m.max_iter = 3500

        return models
    if custom:
        return build_custom_model(selected_model,hyperparams)

    else:
        model = classifiers[selected_model]()
        if isinstance(model, LogisticRegression):
            model.max_iter = 3500

        return model

##permitted parameters gloabal variable 

permitted_params= {
        "Logistic Regression":["max_iter"],
        "Decision Tree":["max_depth","criterion"],
        "Random Forest":["n_estimators","max_depth"],
        "K-Nearest Neighbors":["n_neighbors","weights"],
        "Multinomial Naive Bayes":["alpha"]    
}

def build_custom_model(selected_model,hyperparams):
    classifiers = {
        "Logistic Regression":LogisticRegression,
        "Decision Tree":DecisionTreeClassifier,
         "Random Forest" :RandomForestClassifier,
        "K-Nearest Neighbors":KNeighborsClassifier,
        "Multinomial Naive Bayes":MultinomialNB
    }
     
    custom_params={} 
    for key,value in hyperparams.items():
            if key in permitted_params[selected_model]:
               custom_params[key]= value 
    
    model=classifiers[selected_model](**custom_params)
    print(f"Custom {selected_model} built successfully")
    return model


 #model fitting 

def fit_models(model_input,X_train,y_train):
    trained_models=[]
    if isinstance(model_input,list):
        for m in model_input:
          trained_models.append(m.fit(X_train,y_train))
        return trained_models  
    else:
        trained_model = model_input.fit(X_train,y_train)
        return trained_model    



if __name__ == "__main__":
   breast_cancer_wisconsin_diagnostic, X, y = load_data()
   PERCENTAGE_SAMPLES_USED_FOR_TESTING = 20
   selected_model = "Logistic Regression" 
   X_train,X_test,y_train,y_test = split_the_data(X,y,PERCENTAGE_SAMPLES_USED_FOR_TESTING)
   model_output = build_models(selected_model, build_all=False,custom=False)
   trained_models = fit_models(model_output,X_train,y_train) 
   print("Executed successfully")




        
            