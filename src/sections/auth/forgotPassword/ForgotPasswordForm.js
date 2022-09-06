import React,{ useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {  Stack, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField} from '../../../components/hook-form';
// server
import axios from '../../../server/api'

export default function ForgotPasswordForm() {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');
    const FORGOT_URL = '/forgot-password';

    const ForgotSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    });
    const defaultValues = {
        email: '',
      };

    const methods = useForm({
        resolver: yupResolver(ForgotSchema),
        defaultValues,
    });
    
      const {
        handleSubmit,
        formState: { isSubmitting },
      } = methods;

      const onSubmit = async (data) => {

        try {
          const response = await axios.post(FORGOT_URL, data);
 
          window.alert('We have emailed your password reset link!')
          console.log(JSON.stringify(response?.data));
          
          navigate('/login', { replace: true });
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg('Email not found');
          }
    
      }
    
      };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
      <Box sx={{display:'flex', justifyContent:'center', textAlign:'center', backgroundColor:'#c30000', borderRadius:1}}>
          <Typography variant='h4' sx={{color:'#fff', borderRadius:1 }}>{errMsg}</Typography>
        </Box>
        <RHFTextField name="email" label="Email address" />

      <LoadingButton sx={{backgroundColor:'#159430', ":hover":{ backgroundColor: '#159430' }}} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Submit
      </LoadingButton>
      </Stack>
    </FormProvider>
  )
}
