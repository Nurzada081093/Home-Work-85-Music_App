import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { IArtist } from '../../types';

export const getArtists = createAsyncThunk<IArtist[],void>(
  'artists/getArtists',
  async () => {
    const response = await axiosRequest('artists');
    return response.data || [];
  }
);