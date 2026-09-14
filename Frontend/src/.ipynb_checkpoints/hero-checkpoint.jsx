import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import pinkribbonImg from './assets/Pink_ribbon.svg'

function Hero(){
return(   
<Stack spacing={1} alignItems="Left" sx={{padding:4,backgroundColor:'#F3F6FB'}}>
<img src={pinkribbonImg} alt="Pink ribbon awareness symbol" width="70"/>  
<Typography variant="h2"> Breast Cancer Classification Study  </Typography>    
 <Typography variant="subtitle1" color="text.secondary">Diagnostic Wisconsin Breast Cancer Database</Typography>
</Stack>
)    
}
export default Hero