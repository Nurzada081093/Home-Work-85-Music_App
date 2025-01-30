import { createSlice } from '@reduxjs/toolkit';
import { IArtist, ValidationError } from '../../types';
import { addArtist, deleteArtist, getArtists, publishArtist } from './artistsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ArtistsSlice {
  artists: IArtist[];
  loadings: {
    getLoading: boolean;
    addLoading: boolean;
    deleteLoading: boolean;
    publishLoading: boolean;
  };
  error: boolean;
  addError: ValidationError | null;
}

const initialState: ArtistsSlice = {
  artists: [],
  loadings: {
    getLoading: false,
    addLoading: false,
    deleteLoading: false,
    publishLoading: false,
  },
  error: false,
  addError: null,
};

export const SliceArtists = (state: RootState) => state.artists.artists;
export const SliceLoading = (state: RootState) => state.artists.loadings.getLoading;
export const SliceLoadingAdd = (state: RootState) => state.artists.loadings.addLoading;
export const SliceAddError = (state: RootState) => state.artists.addError;

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
        state.addError = null;
      })
      .addCase(addArtist.fulfilled, (state) => {
        state.loadings.addLoading = false;
        state.addError = null;
      })
      .addCase(addArtist.rejected, (state, {payload: error}) => {
        state.loadings.addLoading = false;
        state.addError = error || null;
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
      })
      .addCase(publishArtist.pending, (state) => {
        state.loadings.publishLoading = true;
        state.error = false;
      })
      .addCase(publishArtist.fulfilled, (state) => {
        state.loadings.publishLoading = false;
        state.error = false;
      })
      .addCase(publishArtist.rejected, (state) => {
        state.loadings.publishLoading = false;
        state.error = true;
      });
  }
});

export const artistsReducer = artistsSlice.reducer;