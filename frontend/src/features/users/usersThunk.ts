import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { GlobalError, IUser, UserLogin, UserRegister, UserRegisterResponse, ValidationError } from '../../types';
import { isAxiosError } from 'axios';

export const registerUser = createAsyncThunk<UserRegisterResponse, UserRegister, {rejectValue: ValidationError}>(
  'users/registerUser',
  async (user, {rejectWithValue}) => {
    try {
      const response = await axiosRequest.post<UserRegisterResponse>('/users/register', {...user});
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk<IUser, UserLogin, {rejectValue: GlobalError}>(
  'users/loginUser',
  async (user, {rejectWithValue}) => {
    try {
      const response = await axiosRequest.post<UserRegisterResponse>('/users/sessions', {...user});
      return response.data.user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  }
);