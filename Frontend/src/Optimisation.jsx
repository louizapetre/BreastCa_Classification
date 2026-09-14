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
import About from  './About.jsx';
import ConfusionMatrix from './matrix.jsx'
import ClassificationReport from './Classification_report'
import Divider from '@mui/material/Divider'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import IconButton from '@mui/material/IconButton'


export default function OptimiseModel() {
const [result,setResult]=useState(null)
const [baselineresult,setbaselineresult]=useState(null)
 const [optimisedresult,setoptimisedresult]=useState(null)   
const [topnfeatures,settopnfeatures] = useState(0)
const [savefeatures,setsavefeatures]=useState(false)
const [retrainmodel,setretrainmodel]=useState(false)
const [hasoptimised,sethasoptimised]=useState(false) 
const [copied, setCopied] = useState(false)

const copyFeatures = () => {
  navigator.clipboard.writeText(JSON.stringify(result, null, 2))
  setCopied(true)
  setTimeout(() => setCopied(false), 1500)
}
    
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
        setsavefeatures(event.target.value)
    }

   const Featuresbtn = async() => {   
        const response= await fetch(`http://127.0.0.1:8000/features/top_n?n=${topnfeatures}&save_features=${savefeatures}&retrain=${retrainmodel}`  
            ,{
           method:'POST'                         
    })   
    const data =await response.json()
    setResult(data) 
    sethasoptimised(true)   
    }
    const Evaluatebtn = async()=>{
      const evaluation_response = await fetch(`http://127.0.0.1:8000/evaluation?filename=savedmodels.pkl`,{
        method :'GET',
        headers:{'Content-Type':'application/json'}  
    })
    const evaluationdata= await evaluation_response.json()
    setbaselineresult(evaluationdata)  
     if (retrainmodel) {
    const optimised_response = await fetch(`http://127.0.0.1:8000/evaluation?filename=topnmodels.pkl`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const optimised_data = await optimised_response.json()
    setoptimisedresult(optimised_data)
  }
            
    }
    
  return (
 <>
  <h2 style={{textAlign:"left",margin:"20px"}}> Feature Selection | Model Optimisation </h2>   
  <div style={{padding:'20px 20px 50px',textAlign:"left"}}>     
     <div> Calculate feature importance according to mutual information score and view top N fetaures. Optionally, retrain your classifier with your selected top features and compare model pefrormance. 
     </div>  
 <Stack direction="row">     
 <Paper elevation={3}  sx={{width:600,maxWidth:1200,padding:3,margin:"20px"}}> 
        <Typography sx={{forntSize:"16px",marginBottom:"10px"}}>Number of top features to keep </Typography> 
       <TextField label={"Top N features"} value={topnfeatures} onChange={(e)=>settopnfeatures(Number(e.target.value))} />  
<Stack direction="row" spacing={2} sx={{ alignItems: 'center',paddingTop:"20px" }}>
<Typography sx={{forntSize:"16px",marginBottom:"10px"}}>Save features? </Typography>
<Select
          value={savefeatures}
          onChange={handleChange}
        > 
          <MenuItem value={true}>Keep</MenuItem>
         <MenuItem value={false}>Display Only</MenuItem>  
        </Select> 
    <FormGroup>
          <FormControlLabel control={<Checkbox
        checked={retrainmodel}
        onChange={(e)=>{setretrainmodel(e.target.checked)
        }} 
        />}label="Retrain based on top features"/>
       </FormGroup>    
</Stack>   
  <Stack direction="row" spacing={3} sx={{width:'100%',paddingTop:'20px'}}> 
       <Button variant = "contained"  sx={{...buttonStyle,textTransform:"none"}} onClick={Featuresbtn}> Optimise </Button>
      {hasoptimised ?(
      <Button variant="outlined" sx={{...buttonStyle,textTransform:"none"}}  onClick={Evaluatebtn}>Evaluate Model</Button>) 
      :(<Typography sx={{border:"1px dotted", borderRadius:"8px",textAlign:"center"}}>Optimise first to enamble model evaluation</Typography>)}    
     </Stack> 
        </Paper> 
 {savefeatures && result && (
  <Paper
    variant="outlined"
    sx={{
      position: 'relative',
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      fontFamily: 'monospace',
      fontSize: '13px',
      padding: '16px',
      borderRadius: '8px',
      margin: '12px 0',
      width:'650px',  
      maxHeight: '500px',
      maxWidth:'800px',  
      overflow: 'auto',
      whiteSpace: 'pre-wrap',
    }}
  >
    <IconButton
      onClick={copyFeatures}
      size="small"
      sx={{ position: 'absolute', top: 8, right: 8, color: '#c9d1d9' }}
    >
      <ContentCopyIcon fontSize="small" />
    </IconButton>
    {copied ? 'Copied!' : null}
    {JSON.stringify(result, null, 2)}
  </Paper>
)}
 </Stack>    
 <h2 style={{textAlign:"left",margin:"20px"}}> Model Comparison</h2>
<Stack direction="row" spacing={3} sx={{marginTop:"20px"}}>    
{baselineresult?.results?.map((item)=>(
<Paper  key={item.model} elevation={2}  sx={{width:900,maxWidth:1200,padding:3,margin:"20px"}}>
    <Typography sx={{fontSize:"20px"}}> <strong>Model</strong> : {item.model}</Typography>
   <Typography sx={{fontSize:"20px"}}><strong>Balanced accuracy</strong> : {(item.balanced_accuracy*100).toFixed(2)}%</Typography> 
    <Typography sx={{fontSize:"20px"}}> <strong>ROC_AUC</strong> : {item.ROC_AUC}</Typography>
     <Divider sx={{marginBottom:2}}/> 
    <ConfusionMatrix matrix={item['Confusion matrix']}/> 
    <ClassificationReport report={item['Classification Report']}/>   
</Paper>))}
    {optimisedresult?.results?.map((item) => (
    <Paper key={item.model} elevation={2} sx={{ flex: 1, padding: 3 }}>
      <Typography sx={{ fontSize: '14px', color: 'text.secondary', marginBottom: 1 }}>Optimised model</Typography>
      <Typography sx={{ fontSize: "20px" }}><strong>Model</strong> : {item.model}</Typography>
      <Typography sx={{ fontSize: "20px" }}><strong>Balanced accuracy</strong> : {(item.balanced_accuracy * 100).toFixed(2)}%</Typography>
      <Typography sx={{ fontSize: "20px" }}><strong>ROC_AUC</strong> : {item.ROC_AUC}</Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <ConfusionMatrix matrix={item['Confusion matrix']} />
      <ClassificationReport report={item['Classification Report']} />
    </Paper>))}
 </Stack>   
    </div>
 </>
      );
      }     



















































