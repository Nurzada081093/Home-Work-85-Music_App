import { createSlice } from '@reduxjs/toolkit';
import { IAlbum } from '../../types';

interface AlbumsSlice {
  albums: IAlbum[];
  album: IAlbum | null;
  loading: boolean;
  error: boolean;
}

const initialState: AlbumsSlice = {
  albums: [],
  album: null,
  loading: false,
  error: false,
}

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {}
});

export const albumsReducer = albumsSlice.reducer;