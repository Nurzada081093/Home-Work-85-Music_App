import { createSlice } from '@reduxjs/toolkit';
import { IArtist } from '../../types';
import { addArtist, deleteArtist, getArtists } from './artistsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ArtistsSlice {
  artists: IArtist[];
  loadings: {
    getLoading: boolean;
    addLoading: boolean;
    deleteLoading: boolean;
  };
  error: boolean;
}

const initialState: ArtistsSlice = {
  artists: [],
  loadings: {
    getLoading: false,
    addLoading: false,
    deleteLoading: false,
  },
  error: false,
};

export const SliceArtists = (state: RootState) => state.artists.artists;
export const SliceLoading = (state: RootState) => state.artists.loadings.getLoading;
export const SliceLoadingAdd = (state: RootState) => state.artists.loadings.addLoading;

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtists.pending, (state) => {
        state.loadings.getLoading = true;
        state.error = false;
      })
      .addCase(getArtists.fulfilled, (state, {payload: artists}) => {
        state.loadings.getLoading = false;
        state.artists = artists;
        state.error = false;
      })
      .addCase(getArtists.rejected, (state) => {
        state.loadings.getLoading = false;
        state.error = true;
      })
      .addCase(addArtist.pending, (state) => {
        state.loadings.addLoading = true;
        state.error = false;
      })
      .addCase(addArtist.fulfilled, (state) => {
        state.loadings.addLoading = false;
        state.error = false;
      })
      .addCase(addArtist.rejected, (state) => {
        state.loadings.addLoading = false;
        state.error = true;
      })
      .addCase(deleteArtist.pending, (state) => {
        state.loadings.deleteLoading = true;
        state.error = false;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.loadings.deleteLoading = false;
        state.error = false;
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.loadings.deleteLoading = false;
        state.error = true;
      });
  }
});

export const artistsReducer = artistsSlice.reducer;