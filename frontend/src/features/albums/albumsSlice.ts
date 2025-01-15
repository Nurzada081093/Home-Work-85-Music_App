import { createSlice } from '@reduxjs/toolkit';
import { IAlbum } from '../../types';
import { getAlbums } from './albunsThunk.ts';
import { RootState } from '../../app/store.ts';

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

export const SliceAlbums = (state: RootState) => state.albums.albums;
export const SliceLoading = (state: RootState) => state.albums.loading;

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlbums.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAlbums.fulfilled, (state, {payload: albums}) => {
        state.loading = false;
        state.albums = albums;
        state.error = false;
      })
      .addCase(getAlbums.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const albumsReducer = albumsSlice.reducer;