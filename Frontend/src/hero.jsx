import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import pinkribbonImg from './assets/Pink_ribbon.svg'

function Hero(){
return(   
<Stack spacing={1} direction="row" spacing={0.25} alignItems="center" sx={{padding:"0 20px",backgroundColor:'#FAFDFF'}}>
<Stack sx={{flex:"0 0 auto",textAlign:"left"}}>    
<img src={pinkribbonImg} alt="Pink ribbon awareness symbol" width="70"/>  
</Stack>    
<Stack sx={{flex:"0 0 auto",textAlign:"left"}} >      
<Typography variant="h2"> Breast Cancer Classification Study  </Typography>    
 <Typography variant="subtitle1" color="text.secondary">Diagnostic Wisconsin Breast Cancer Database</Typography>
 </Stack>   
</Stack>
)    
}
export default Hero