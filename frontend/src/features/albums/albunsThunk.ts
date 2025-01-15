import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { IAlbum } from '../../types';

export const getAlbums = createAsyncThunk<IAlbum[], string>(
  'albums/getAlbums',
  async (artistId) => {
    const response = await axiosRequest(`/albums?artist=${artistId}`);
    return response.data || [];
  }
);