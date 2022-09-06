import React, {useState} from 'react';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField, } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';
import axios from '../../../server/api'

export default function ResetForm() {
    const navigate = useNavigate();
    const RESET_URL = '/reset-password';
    const { token } = useParams();
    
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    

    const ForgotSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        password_confirmation: Yup.string().oneOf([Yup.ref("password"),null], "Password does not match").required('Comfirm Password is required'),
    });

    const defaultValues = {
        email: '',
        password: '',
        password_confirmation: '',
        token,
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
          const response = await axios.post(RESET_URL, data)
              
          
    
          console.log(JSON.stringify(response?.data));
          
          window.localStorage.setItem('token', response?.data?.token );
          /* alert("Password reset successful") */
          navigate('/login', { replace: true });
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg('Login Failed');
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

        <RHFTextField
          name="password"
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="password_confirmation"
          label="Confirmation Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton sx={{backgroundColor:'#159430', ":hover":{ backgroundColor: '#159430' }}} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Submit
        </LoadingButton>
      
      </Stack>
    </FormProvider>
  )
}
