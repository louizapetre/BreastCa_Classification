from data import load_data
from models import split_the_data
from sklearn.feature_selection import mutual_info_classif



###Rudimentary feature selection 

def feature_selection(X_train,y_train):
    feature_score = {
                "feature": X_train.columns.tolist(),
                "mi_score": mutual_info_classif(X_train, y_train)   
    }
    feature_score = dict(zip(feature_score["feature"], feature_score["mi_score"]))
    sorted_scores ={}
    for key in sorted(feature_score, key=feature_score.get,reverse=True):
        sorted_scores[key] = feature_score[key]
    return sorted_scores

def keep_top_n(sorted_scores,n,X_train,X_test):
    featurestokeep= list(sorted_scores.keys())[:n]
    features_scores={k:sorted_scores[k] for k in featurestokeep}
    X_train= X_train[featurestokeep]
    X_test= X_test[featurestokeep]
    return featurestokeep,features_scores,X_train,X_test



if __name__ == "__main__":
    breast_cancer_wisconsin_diagnostic,X,y = load_data()
    PERCENTAGE_SAMPLES_USED_FOR_TESTING = 20
    n=10
    X_train,X_test,y_train,y_test = split_the_data(X,y,PERCENTAGE_SAMPLES_USED_FOR_TESTING)
    sorted_scores = feature_selection(X_train,y_train)
    print(sorted_scores)
    print(keep_top_n(sorted_scores,n,X_train,X_test)[0])
    print("Executed successfully")