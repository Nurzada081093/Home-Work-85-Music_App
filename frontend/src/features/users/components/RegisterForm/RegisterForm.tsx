import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { UserRegister } from '../../../../types';
import { useAppSelector } from '../../../../app/hooks.ts';
import { registerErrorFromSlice, registerLoadingFromSlice } from '../../usersSlice.ts';
import { CircularProgress } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';

interface Props {
  register: (user: UserRegister) => void;
}

const initialUserState = {
  username: '',
  password: ''
};

const RegisterForm: React.FC<Props> = ({register}) => {
  const [registerForm, setRegisterForm] = useState<UserRegister>(initialUserState);
  const registerError = useAppSelector(registerErrorFromSlice);
  const loading = useAppSelector(registerLoadingFromSlice);

  const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register({...registerForm});
  };

  const getError = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(245,245,245,0.75)',
          borderRadius: '10px',
          padding: '30px 0',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{pt: 2}}>
          <GoogleLogin onSuccess={((credentialResponse) => {
            console.log(credentialResponse);
          })} onError={() => alert('Login failed!')}/>
        </Box>
        <Box component="form" noValidate onSubmit={submitUser} sx={{ mt: 3 }}>
          <Grid container direction={'column'} spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={onChangeUser}
                error={Boolean(getError('username'))}
                helperText={getError('username')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChangeUser}
                error={Boolean(getError('password'))}
                helperText={getError('password')}
              />
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
            {loading ?  <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid size={12}>
              <NavLink to={'/login'}>
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
