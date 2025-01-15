import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrack } from '../../types';
import axiosRequest from '../../axiosRequest.ts';

export const getTracks = createAsyncThunk<ITrack[], string>(
  'tracks/getTracks',
  async (albumsId) => {
    const response = await axiosRequest(`/tracks?album=${albumsId}`);
    return response.data || [];
  }
);