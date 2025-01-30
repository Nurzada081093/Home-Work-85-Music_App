import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITrack, ITrackMutation } from '../../types';
import axiosRequest from '../../axiosRequest.ts';

export const getTracks = createAsyncThunk<ITrack[], string>(
  'tracks/getTracks',
  async (albumsId) => {
    const response = await axiosRequest(`/tracks?album=${albumsId}`);
    return response.data || [];
  }
);

export const addTrack = createAsyncThunk<void, {track: ITrackMutation, token: string}>(
  'tracks/addTrack',
  async ({track, token}) => {
    await axiosRequest.post('tracks', {...track}, {headers: {'Authorization': token}});
  }
);