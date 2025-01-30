import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { IArtist, IArtistMutation } from '../../types';

export const getArtists = createAsyncThunk<IArtist[],void>(
  'artists/getArtists',
  async () => {
    const response = await axiosRequest('artists');
    return response.data || [];
  }
);

export const addArtist = createAsyncThunk<void, {artist: IArtistMutation, token: string }>(
  "artists/addArtist",
  async ({artist, token}) => {
    const formData = new FormData();

    const keys = Object.keys(artist) as (keyof IArtistMutation)[];

    keys.forEach((key) => {
      const value = artist[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosRequest.post('/artists', formData, {headers: {'Authorization': token}});
  },
);