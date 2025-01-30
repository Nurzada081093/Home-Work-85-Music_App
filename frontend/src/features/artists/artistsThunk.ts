import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { IArtist, IArtistMutation, ValidationError } from '../../types';
import { isAxiosError } from 'axios';

export const getArtists = createAsyncThunk<IArtist[],void>(
  'artists/getArtists',
  async () => {
    const response = await axiosRequest('artists');
    return response.data || [];
  }
);

export const addArtist = createAsyncThunk<void, {artist: IArtistMutation, token: string }, {rejectValue: ValidationError}>(
  "artists/addArtist",
  async ({artist, token}, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(artist) as (keyof IArtistMutation)[];

      keys.forEach((key) => {
        const value = artist[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosRequest.post('/artists', formData, {headers: {'Authorization': token}});
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

export const deleteArtist = createAsyncThunk<void, {artistId: string, token: string}>(
  'artists/deleteArtist',
  async ({artistId, token}) => {
    await axiosRequest.delete(`/artists/${artistId}`, {headers: {'Authorization': token}});
  }
);

export const publishArtist = createAsyncThunk<void, {artistId: string, token: string}>(
  'artists/publishArtist',
  async ({artistId, token}) => {
    await axiosRequest.patch(`/artists/${artistId}/togglePublished`, {headers: {'Authorization': token}});
  }
);