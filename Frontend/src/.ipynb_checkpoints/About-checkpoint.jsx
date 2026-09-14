import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider'




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(model,parameters, status) {
  return {model,parameters, status};
}

const rows = [
  createData('Logistic Regression', 'max-iter', 'stable'),
  createData('Random Forest',"['n_estimators','max_depth']", 'stable'),
  createData('Decision Tree',"['max_depth','criterion']", 'stable'),               
  createData('K-Nearest Neighbors',"['n_neighbors','weights']", 'stable'),
  createData('Multinomial Naive Bayes','alpha','stable'),
];


function createTechstacktable(Layer,Technology,Purpose) {
  return {Layer,Technology,Purpose};
}

const tech_rows = [
createTechstacktable('UI', 'React 19.2.8', 'SPA shell'),
createTechstacktable('API','FastAPI 0.1.0','REST+request validation'),
createTechstacktable('Model Training','scikit-learn 1.9.0', 'Model training & evaluation'),              
];


export default function About() {
  return (
  <Stack sx={{margin:"auto auto", maxWidth:"800"}} >
      <Stack sx={{textAlign:"left",padding:'20px',maxWidth:"800px"}}>
      <h1 sx={{textAlign:"left",padding:'25px',maxWidth:"800px"}}>DiagnosticML</h1>
       <div>A full-stack machine learning web app for training and evaluating models on the  Wisconsin Diagnostic Breast Cancer dataset. Framed around a modern React UI, offering 5 classifiers and mutual-information feature selection, powered a Python backend.</div>   
      </Stack>
    <Stack sx={{textAlign:"left",padding:'20px',maxWidth:"800px"}}>
    <h2 sx={{textAlign:"center",margin:"20px"}}>Overview</h2>
    <Divider sx={{marginBottom:2}}/>   
    <div> Training runs through two modes: bulk training across all five classifiers at default settings, or single-model training with custom hyperparameters. Trained models persist to disk and are evaluated independently of the training request — accuracy, confusion matrix, classification report, and ROC AUC available on demand. Feature selection ranks the dataset's 30 input features by mutual information score, with support for retraining on a reduced feature subset to compare against the full-feature baseline. </div>    
    </Stack>
<Stack sx={{textAlign:"left",padding:'20px',maxWidth:"800px"}} >
   <h2 sx={{textAlign:"center",margin:"20px"}}>Getting Started</h2>
  <Divider sx={{marginBottom:2}}/> 
      <div>
      Select Baseline mode to train all five classifiers at once, or switch to Custom to configure a single model's hyperparameters. Once trained, view results via the Evaluate action. Under the Optimisation tab, rank features by predictive value and optionally retrain on a reduced feature set to compare performance.
      </div>
</Stack>
      <Stack sx={{textAlign:"left",padding:'20px',maxWidth:"800px"}} >
     <h2 sx={{textAlign:"center",margin:"20px"}}>Supported Classifiers</h2>  
       <Divider sx={{marginBottom:2}}/>      
      <TableContainer component={Paper} sx={{borderRadius:'18px',maxWidth:700,border:'1px solid #F3F6FB', margin:"20px auto 25px" }}  >
      <Table sx={{margin:"auto auto", maxWidth:600}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Model</StyledTableCell>
            <StyledTableCell align="right">Parameters</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
              <StyledTableRow key={row.model}>
              <StyledTableCell align="right">{row.model}</StyledTableCell>
              <StyledTableCell align="right">{row.parameters}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Stack>
    <Stack sx={{textAlign:"left",padding:'20px',maxWidth:"800px"}}>  
    <h2 style={{textAlign:"left",margin:"20px"}}>Tech Stack</h2> 
    <Divider sx={{marginBottom:2}}/>     
    <TableContainer component={Paper} sx={{borderRadius:'18px',maxWidth:700,border:'1px solid #F3F6FB', margin:"20px auto 25px" }}>
      <Table sx={{ margin:"auto auto", maxWidth:600}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Layer</StyledTableCell>
            <StyledTableCell align="right">Technology</StyledTableCell>
            <StyledTableCell align="right">Purpose</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tech_rows.map((tech_row) => (
            <StyledTableRow key= {tech_row.Layer}>
              <StyledTableCell align="right">{tech_row.Layer}</StyledTableCell>
              <StyledTableCell align="right">{tech_row.Technology}</StyledTableCell>
              <StyledTableCell align="right">{tech_row.Purpose}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
      </Stack>  
      </Stack>
  );
}
