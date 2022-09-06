import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';

import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import axios from '../../../server/api'


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const LOGIN_URL = '/login';

  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  useEffect(() => {
    setErrMsg('');
}, [])


  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {

    try {
      const response = await axios.post(LOGIN_URL, data)
      
      localStorage.setItem('token', response?.data?.token );
      console.log(response)
   

      navigate('/dashboard/app', { replace: true });
  } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Wrong email or Password');
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
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link sx={{cursor:'pointer'}} onClick={() => { navigate("/forgot-password");}} variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton sx={{backgroundColor:'#159430', ":hover":{ backgroundColor: '#159430' }}} fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
