import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { IAlbum, IAlbumMutation } from '../../types';

export const getAlbums = createAsyncThunk<IAlbum[], string>(
  'albums/getAlbums',
  async (artistId) => {
    const response = await axiosRequest(`/albums?artist=${artistId}`);
    return response.data || [];
  }
);

export const addAlbum = createAsyncThunk<void, {album: IAlbumMutation, token: string }>(
  "albums/addAlbum",
  async ({album, token}) => {
    const formData = new FormData();

    const keys = Object.keys(album) as (keyof IAlbumMutation)[];

    keys.forEach((key) => {
      const value = album[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosRequest.post('/albums', formData, {headers: {'Authorization': token}});
  },
);

export const deleteAlbum = createAsyncThunk<void, {albumId: string, token: string}>(
  'albums/deleteAlbum',
  async ({albumId, token}) => {
    await axiosRequest.delete(`/albums/${albumId}`, {headers: {'Authorization': token}});
  }
);