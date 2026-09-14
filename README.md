# Machine Learning Classification Study
#### Diagnostic Wisconsin Breast Cancer Database

Breast cancer is associated with a high incidence of mortality worldwide and one of the leading causes of mortality attributed to malignancies amongst women. The integrative analysis of imaging-derived tumor features using machine learning techniques has introduced a promising new dimension to breast cancer research. The training and optimisation of machine learning models can be leveraged to deconvolute large and often complex datasets incorporating cancer diagnostic data. 

The present application was developed as a tool for the critical analysis of the Diagnostic Wisconsin Breast Cancer Database using standard machine learning Classifiers (Logistic Regression, K-Near Neighbors (KNN), Decision Tree, Random Forest and Multinomial Naive Bayes). The dataset consists of 30 input features and a single binary (0-1) target interpreted as Benign or Malignant. Given the dataset size and complexity, end users are given the option of data exploration, including feature selection employing mutual information classification. Examination of tumor malignancy likelihood and model performance/optimisation using standard metrics is central to the application.

## Getting Started 

This project is powered by a frontend (React) server and a backend (Python Fastapi ) server. To build a functional version of the application BOTH servers must be up and running 
(note for begginers: keep both terminals open and running) . 

### Setting up the backend 

Open the Backend folder in your terminal and set up a virtual environment. 
```
bash
cd {your_path}/Backend
python3 -m vevn myvenv #pick a name for you venv
```
 
**next up : activate it:**
 
Windows (Command Prompt or PowerShell):
```bash
venv\Scripts\activate
```
 
Mac/Linux:
```bash
source venv/bin/activate
```
 

Install all required dependencies ``` python python3 -r install requirements.txt ```


And finally run your backend server 🎉 

``` python fastapi dev main.py ```
Your terminal will produce a link. Feel free to copy paste that in your browser to take a peek under the hood 😃

### Setting up frontend

- Initially check that Node.js  exists device wide and if missing download and install it as per the docs at :
https://nodejs.org/en/download
- Once this step is completed open your frontend folder and install npm.
```
bash
cd {your_path}/Frontend
npm install 
```
Now run your frontend server! (You're done!)
```
npm run dev

```
Look for the link produced by your terminal. You will want to copy paste that right into your browser to get started. 

### Backend
- **Python** — core language
- **FastAPI** — REST API framework
- **Pydantic** — request validation & data modeling
- **Uvicorn** — ASGI server (via `fastapi dev`)
- **scikit-learn** — Logistic Regression, Decision Tree, Random Forest, KNN, Multinomial Naive Bayes; mutual-information feature selection
- **pandas** — data loading & manipulation
- **joblib** — model persistence/serialization
- **CORS middleware** — cross-origin request handling

### Frontend
- **React** — component-based UI
- **Vite** — build tool & dev server
- **JavaScript (ES6+) / JSX**
- **Material UI (MUI)** — Button, Switch, Select, Checkbox, Stack, Paper, Typography
- **Emotion** — MUI's underlying styling engine
- **Fetch API** — HTTP requests to the backend
- **ESLint** — linting

### Data
- Wisconsin Diagnostic Breast Cancer dataset (UCI Machine Learning Repository)

## Skills Developed
- Designing and building a REST API from scratch (routing, request/response models, error handling)
- Full-stack integration — connecting a React frontend to an independent Python backend
- Configuring and reasoning about CORS and browser same-origin policy
- State management and controlled components in React (`useState`, conditional rendering)
- Component-based UI architecture (reusable, composable components)
- Asynchronous JavaScript (`async`/`await`, Promises, `fetch`)
- Systematic debugging across two languages (tracing `NameError`/`ReferenceError`/`SyntaxError` to root cause rather than guessing)
- Model persistence and reproducible ML pipelines (train/test splitting, feature selection, hyperparameter tuning, evaluation metrics)
- Environment management (Python virtual environments, npm dependency management)
