import { useState, useEffect } from 'react'
import './App.css'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper'
import './navbar.css';
import Footer from './footer'
import Hero from './hero'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import OptimiseModel from './Optimisation.jsx'
import About from  './About.jsx';
import ConfusionMatrix from './matrix.jsx'
import ClassificationReport from './Classification_report'
import Divider from '@mui/material/Divider'
import FeatureImportanceChart from './Insights'


function App() {
    const [result,setResult]=useState(null)
    const [buildAll,setBuildAll]=useState(true)
    const [isCustom,setisCustom]=useState(false)
    const [testingpercentage,settestingpercentage] = useState(20)
    const[permittedparams,setpermittedparams]=useState({})
    const[hyperparams,sethyperparams]=useState({})
    const [model,setModel]=useState('');
    const [tab,settab]=useState(0)
    const buttonStyle={
        height:'40px',
        px:2.5,
        fontSize:'14px',
        fontWeight:'450',
        borderRadius:'10px',
        lineHeight:1.2,
        display:'inline-flex', 
    }
    const handleChange=(event)=>{
        setModel(event.target.value)
    }

useEffect(()=>{
    const grabparams = async()=>{
    const params_response = await fetch('http://127.0.0.1:8000/models')
    const paramdata= await params_response.json()
    setpermittedparams(paramdata)          
    }
    grabparams()},[])

    
    const TrainModelsbtn = async() => {
        const url=isCustom
        ?'http://127.0.0.1:8000/train/custom'
        :'http://127.0.0.1:8000/train/baseline'    

        const body =isCustom
        ?{selected_model:model,hyperparams:{},PERCENTAGE_SAMPLES_USED_FOR_TESTING:testingpercentage}
        :{build_all:buildAll,selected_model:model,PERCENTAGE_SAMPLES_USED_FOR_TESTING:testingpercentage}    
       
        const response= await fetch(url,{
           method:'POST',
           headers:{'Content-Type':'application/json'},
           body:JSON.stringify(body)                               
    })   
    const data =await response.json()
    setResult(data)    
    }
    const Evaluatebtn = async()=>{
    const evaluation_response = await fetch('http://127.0.0.1:8000/evaluation',{
        method :'GET',
        headers:{'Content-Type':'application/json'} 
    })
    const evaluationdata= await evaluation_response.json()
    setResult(evaluationdata)          
    }
    
  return (
    <>
<Hero/>
<Tabs
value={tab}
onChange={(e,newvalue)=>settab(newvalue)} 
sx= {{borderBottom: '1px solid #e8e8e8',
    '& .MuiTab-root':{ textTransform: 'none',
    fontWeight:500,
    fontSize:'20px',
    marginRight:'8px'}
    }}
>
<Tab label="Model Training"/> 
<Tab label="Optimisation"/>
<Tab label="About"/>         
</Tabs>        
 
        {tab==0 && ( 

    <>
    <div style={{padding:'20px 20px 50px',textAlign:"left"}}>     
     <div>Breast cancer is associated with a high incidence of mortality worldwide and one of the leading causes of mortality attributed to malignancies amongst women. The integrative analysis of imaging-derived tumor features using machine learning techniques has introduced a promising new dimension to breast cancer research. The  training and optimisation of machine learning models can be leveraged to deconvolute large and often complex datasets incorporating cancer diagnostic data.</div>
        <div>The present application was developed as a tool for the critical analysis of the Diagnostic Wisconsin Breast Cancer Database using standard machine learning Classifiers (Logistic Regression, K-Near Neighbors (KNN), Decision Tree, Random Forest and Multinomial Naive Bayes). The dataset consists of 30 input features and a single binary (0-1) target interpreted as Benign or Malignant. Given the dataset size and complexity, end users are given the option of data exploration, including feature selection employing mutual information classification. Examination of tumor malignancy likelihood and model performance/optimisation using standard metrics is central to the application.</div> 
     </div>  
      <h2 style={{textAlign:"left",margin:"20px"}}> Classifier Selection & Training</h2>  
      <Paper elevation={3}  sx={{width:900,maxWidth:1200,padding:3,margin:"20px"}}> 
        <Stack spacing={2} alignItems="center">  
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography>Baseline</Typography>
        <Switch checked={isCustom} onChange={(e)=>setisCustom(e.target.checked)}/> 
        <Typography>Custom</Typography>
      </Stack> 
            {!isCustom &&(<FormGroup>
          <FormControlLabel control={<Checkbox
        checked={buildAll}
        onChange={(e)=>{setBuildAll(e.target.checked)
        setModel(e.target.checked ? '__BULK__' : '')
        }} 
        />}label="Bulk train all classifiers"/>
       </FormGroup>) }   
        <Select
          displayEmpty
          value={model}
          onChange={handleChange}
        >
          <MenuItem value=""disabled>
          Select a Classifier (ML Model) 
          </MenuItem>
            {buildAll&& ( <MenuItem value="__BULK__">Building and Training all Models</MenuItem>)}
          <MenuItem value={"Logistic Regression"}>Logistic Regression</MenuItem>
         <MenuItem value={"K-Nearest Neighbors"}>K-Nearest Neighbors</MenuItem> 
          <MenuItem value={"Random Forest"}>Random Forest</MenuItem>
          <MenuItem value={"Decision Tree"}>Decision Tree</MenuItem>
          <MenuItem value={"Multinomial Naive Bayes"}>Naive Bayes</MenuItem>  
        </Select> 
  <TextField label={"Testing Percentage"} value={testingpercentage} onChange={(e)=>settestingpercentage(Number(e.target.value))} />         
 {isCustom && permittedparams[model]?.map((key)=>(
            <TextField key={key} label={key} value={hyperparams[key]|| ''} onChange={(e)=>sethyperparams({...hyperparams,[key]: e.target.value})}/>
    ))}            
         </Stack> 
         <Stack direction="row" spacing={2} sx={{width:'100%',paddingTop:'20px'}}>  
        <Button variant = "contained"  sx={{...buttonStyle,textTransform:"none"}} onClick={TrainModelsbtn}>Train Model </Button>
     <Button variant="outlined" sx={{...buttonStyle,textTransform:"none"}}  onClick={Evaluatebtn}>Evaluate Model</Button>
     </Stack> 
        </Paper>        
{result?.status &&(
<Alert variant="outlined" sx={{width:'40%',margin:"20px"}} severity="success">
  Model Trained and Saved
</Alert>)}
 <h2 style={{textAlign:"left",margin:"20px"}}> Model Evaluation</h2>
{result?.results?.map((item)=>(
<Paper  key={item.model} elevation={2}  sx={{width:900,maxWidth:1200,padding:3,margin:"20px"}}>
    <Typography sx={{fontSize:"20px"}}> <strong>Model</strong> : {item.model}</Typography>
   <Typography sx={{fontSize:"20px"}}><strong>Balanced accuracy</strong> : {(item.balanced_accuracy*100).toFixed(2)}%</Typography> 
    <Typography sx={{fontSize:"20px"}}> <strong>ROC_AUC</strong> : {item.ROC_AUC}</Typography>
     <Divider sx={{marginBottom:2}}/> 
    <ConfusionMatrix matrix={item['Confusion matrix']}/> 
    <ClassificationReport report={item['Classification Report']}/> 
  
</Paper>))
    }
 <h2 style={{textAlign:"left",margin:"20px"}}> Model Insights</h2>        
{result?.insights?.map((item) => {
  if (item.model === "Logistic Regression") {
    return(  
    <Paper  key={item.model} elevation={2}  sx={{width:'100%',maxWidth:1200,padding:3,margin:"20px"}}> 
     <h3 style={{textAlign:"left",margin:"20px"}}> Coefficients</h3>   
    <FeatureImportanceChart key={item.model} values={item.coefficients[0]} label={item.model} />
    </Paper> )  
  }
  if (item.model === "Random Forest" || item.model === "Decision Tree") {
    return(
     <Paper  key={item.model} elevation={2}  sx={{width:'100%',maxWidth:1200,padding:3,margin:"20px"}}> 
     <h3 style={{textAlign:"left",margin:"20px"}}> Feature importances</h3>    
   <FeatureImportanceChart key={item.model} values={item.feature_importances} label={item.model} />
   </Paper>  
)
  }
  if (item.model === "K-Nearest Neighbors") {
    return (
      <Paper key={item.model} variant="outlined" sx={{ padding: 3, margin: "12px 0",maxWidth:600 }}>
        <Typography sx={{ fontWeight: 500 }}>{item.model}</Typography>
        <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>Number of neighbors: {item.number_of_neighbors}</Typography>
        <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>Weighting: {item.weights}</Typography>
      </Paper>
    )
  }
  if (item.model === "Multinomial Naive Bayes") {
    return (
      <Paper key={item.model} variant="outlined" sx={{ padding: 3, margin: "12px 0",maxWidth:600 }}>
        <Typography sx={{ fontWeight: 500 }}>{item.model}</Typography>
        <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
          Class log priors: {item.class_log_prior.map((v) => v.toFixed(3)).join(', ')}
        </Typography>
      </Paper>
    )
  }
})}
        
     
 
    </>
       
       ) }

{tab==1 && <OptimiseModel/>}
{tab==2 && <About/>}
        
    <Footer/>
        
    </>
  )
}

export default App
