import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { ITrackHistory } from '../../types';

export const addTrackHistory = createAsyncThunk<void, { track: string, token: string }>(
  'trackHistories/addTrackHistory',
  async ({track, token}) => {
    await axiosRequest.post('/track_history', {track}, {headers: {'Authorization': token}});
  }
);

export const getTrackHistories = createAsyncThunk<ITrackHistory[], string>(
  'trackHistories/getTrackHistories',
  async (token) => {
    const response = await axiosRequest('/track_history', {headers: {'Authorization': token}});
    return response.data;
  }
);