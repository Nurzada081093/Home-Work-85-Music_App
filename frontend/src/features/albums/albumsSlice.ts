import { createSlice } from '@reduxjs/toolkit';
import { IAlbum } from '../../types';
import { addAlbum, getAlbums } from './albumsThunk.ts';
import { RootState } from '../../app/store.ts';

interface AlbumsSlice {
  albums: IAlbum[];
  album: IAlbum | null;
  loadings: {
    getAlbumsLoading: boolean;
    addAlbumLoading: boolean;
    deleteAlbumLoading: boolean;
  };
  error: boolean;
}

const initialState: AlbumsSlice = {
  albums: [],
  album: null,
  loadings: {
    getAlbumsLoading: false,
    addAlbumLoading: false,
    deleteAlbumLoading: false,
  },
  error: false,
};

export const SliceAlbums = (state: RootState) => state.albums.albums;
export const SliceLoading = (state: RootState) => state.albums.loadings.getAlbumsLoading;
export const SliceAddLoading = (state: RootState) => state.albums.loadings.addAlbumLoading;

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlbums.pending, (state) => {
        state.loadings.getAlbumsLoading = true;
        state.error = false;
      })
      .addCase(getAlbums.fulfilled, (state, {payload: albums}) => {
        state.loadings.getAlbumsLoading = false;
        state.albums = albums;
        state.error = false;
      })
      .addCase(getAlbums.rejected, (state) => {
        state.loadings.getAlbumsLoading = false;
        state.error = true;
      })
      .addCase(addAlbum.pending, (state) => {
        state.loadings.addAlbumLoading = true;
        state.error = false;
      })
      .addCase(addAlbum.fulfilled, (state) => {
        state.loadings.addAlbumLoading = false;
        state.error = false;
      })
      .addCase(addAlbum.rejected, (state) => {
        state.loadings.addAlbumLoading = false;
        state.error = true;
      });
  }
});

export const albumsReducer = albumsSlice.reducer;