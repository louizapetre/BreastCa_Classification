
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import MultinomialNB


#Importing evaluation metrics

from sklearn.metrics import roc_auc_score
from sklearn.metrics import confusion_matrix
from sklearn.metrics import ConfusionMatrixDisplay
from sklearn.metrics import classification_report
from sklearn.metrics import balanced_accuracy_score
from data import load_data ,encode_target
from models import split_the_data,build_models,fit_models 


#Model evaluation panel
def evaluate_models(model_output,X_test,y_test):
    if not isinstance(model_output,list):
        model_output= [model_output]
    evaluation = []
    for m in model_output:
        predictions = m.predict(X_test)
        y_prob = m.predict_proba(X_test)[:,1]
            
        print("Balanced Accuracy Scores for", str(m), ":")
        balanced_accuracies = balanced_accuracy_score(y_test,predictions)
        print(balanced_accuracies)
            
        print("*******************************")
        cm = confusion_matrix(y_test, predictions, labels=m.classes_)
        print("Confusion matrix for", str(m), ":")
        print(cm)
            
        cm_display= ConfusionMatrixDisplay.from_estimator(m, X=X_test, y=y_test, 
        labels=m.classes_, cmap='Blues')
            
        print('***** Classification report for ', str(m), '***** ')
        model_reports= classification_report(y_test, predictions,output_dict=True)
        print(model_reports)

        print('***** ROC Area Under the Curve for', str(m), '***** ')
        roc_auc = roc_auc_score(y_test, y_prob)
        print(f"ROC AUC Score ~=> {round(roc_auc, 2)}")
                
            
        evaluation.append({
            "model":str(m),
            "balanced_accuracy" :balanced_accuracies,
            "Confusion matrix" : cm.tolist(),
            "Classification Report": model_reports,
            "ROC_AUC":round(roc_auc,2)                
            })    
    return evaluation

##Retrieving model insights

def retrieve_insights(model_input):
    if not isinstance(model_input,list):
        model_input= [model_input]
    insights = []
    for m in model_input:
        if isinstance(m, LogisticRegression):
            insights.append({
                    "model": "Logistic Regression",
                    "intercept": m.intercept_.tolist(),
                    "coefficients": m.coef_.tolist()
                })

        elif isinstance(m, DecisionTreeClassifier):
            insights.append({
                    "model": "Decision Tree",
                    "tree_depth": m.get_depth(),
                    "number_of_leaves": int(m.get_n_leaves()),
                    "feature_importances": m.feature_importances_.tolist()
                })

        elif isinstance(m, RandomForestClassifier):
                insights.append({
                        "model": "Random Forest",
                        "number_of_estimators": m.n_estimators,
                        "feature_importances": m.feature_importances_.tolist()
            })

        elif isinstance(m, KNeighborsClassifier):
                insights.append({
                        "model": "K-Nearest Neighbors",
                        "number_of_neighbors": m.n_neighbors,
                        "weights": m.weights
            })

        elif isinstance(m, MultinomialNB):
                    insights.append({
                        "model": "Multinomial Naive Bayes",
                        "class_log_prior": m.class_log_prior_.tolist(),
                        "feature_log_prob": m.feature_log_prob_.tolist()
            })
    return insights   

 
if __name__ == "__main__":
   breast_cancer_wisconsin_diagnostic, X, y = load_data()
   PERCENTAGE_SAMPLES_USED_FOR_TESTING = 20
   selected_model = "Logistic Regression" 
   X_train,X_test,y_train,y_test = split_the_data(X,y,PERCENTAGE_SAMPLES_USED_FOR_TESTING)
   model_output = build_models(selected_model, build_all=False,custom=False)
   trained_models = fit_models(model_output,X_train,y_train) 
   print(evaluate_models(trained_models,X_test,y_test))
   print(retrieve_insights(trained_models))
   print("Executed successfully")
        

