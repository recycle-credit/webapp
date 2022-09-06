import { Box, styled, Typography} from '@mui/material';
import React from 'react';
import { ResetForm } from '../sections/auth/reset';


const Container = styled('div')`
    height: 100%;
    width: 100%;
    background-color: #026316;
    display: flex;
    position: fixed;
    align-items: center;
    text-align: center;
    justify-content: center;
`

export default function Reset() {
  

  return (
    <Container>
        <Box sx={{ backgroundColor:'#fff', width: 700, height: 400, display: 'flex',  justifyContent: 'center', alignItems: 'center', borderRadius: 2 }}>
            <Box sx={{width:600}}>
            
        
                    <Typography sx={{ display:'flex', justifyContent:'center', color:'#004E10', fontSize: 18, fontWeight: 800, marginBottom: 1}}>Reset Password</Typography>
                    <Typography sx={{ display:'flex', justifyContent:'flex-start', color:'#818181', fontSize:13, fontWeight: 400, marginBottom: -1, width: 700, }}>
                    Please enter the details below.
                    </Typography>

                    <ResetForm />
                    
                   
                
            
            </Box>
        </Box>
    </Container>
  )
}

