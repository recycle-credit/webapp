import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Typography, Box, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axios from '../../../server/api';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const REGISTER_URL = '/register';

  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const RegisterSchema = Yup.object().shape({
    usertype: Yup.string().required('Usertype name required'),
    username: Yup.string().required('Username name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(7).required('Password is required'),
    password_confirmation: Yup.string().oneOf([Yup.ref("password"),null], "Password does not match").required('Comfirm Password is required'),
  });

  const defaultValues = {
    usertype: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    
    try {
      const response = await axios.post(REGISTER_URL, data)
        
      console.log(JSON.stringify(response?.data));
      
      navigate('/login', { replace: true });
  } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('The email has already been taken');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
      }

  }
  
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Box sx={{display:'flex', justifyContent:'center', textAlign:'center', backgroundColor:'#c30000', borderRadius:1}}>
          <Typography variant='h4' sx={{color:'#fff', borderRadius:1 }}>{errMsg}</Typography>
        </Box>
     
        
        <RHFTextField name="usertype" select label="Usertype">
          <MenuItem value={'Buyer'}>Buyer</MenuItem>
          <MenuItem value={'Seller'}>Seller</MenuItem>
        </RHFTextField>
        
        <RHFTextField name="username" label="Username" />
        
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
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
          label="Password_confirmation"
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
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
