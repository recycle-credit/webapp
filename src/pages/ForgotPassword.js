import { Box, styled, Typography, Link } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ForgotPasswordForm } from '../sections/auth/forgotPassword';

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



export default function Login() {
  

  return (
    <Container>
        <Box sx={{ backgroundColor:'#fff', width: 700, height: 400, display: 'flex',  justifyContent: 'center', alignItems: 'center', borderRadius: 2 }}>
            <Box sx={{width:600}}>
            
        
                    <Typography sx={{ display:'flex', justifyContent:'center', color:'#004E10', fontSize: 18, fontWeight: 800, marginBottom: 1}}>Forgot Password</Typography>
                    <Typography sx={{ display:'flex', justifyContent:'flex-start', color:'#818181', fontSize:13, fontWeight: 400, marginBottom: 2, width: 700}}>
                    Please enter the Email you used for your account a password reset link will be sent to the Email.
                    </Typography>

                    <ForgotPasswordForm />
                    
                    <Box sx={{ display:'flex', justifyContent:'flex-start', gap: 0.5, mt:2  }}>
                        <Typography sx={{ borderRadius: 1, color: '#25282B'}}>Do not have an account?</Typography>
                        <Link variant="subtitle2" underline="none" sx={{color: '#F6C09D', }} component={RouterLink} to="/register">
                            Register
                        </Link>
                    </Box>
            </Box>
        </Box>
    </Container>
  )
}