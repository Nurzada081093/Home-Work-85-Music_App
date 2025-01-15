import { createSlice } from '@reduxjs/toolkit';
import { IArtist } from '../../types';
import { getArtists } from './artistsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ArtistsSlice {
  artists: IArtist[];
  loading: boolean;
  error: boolean;
}

const initialState: ArtistsSlice = {
  artists: [],
  loading: false,
  error: false,
}

export const SliceArtists = (state: RootState) => state.artists.artists;
export const SliceLoading = (state: RootState) => state.artists.loading;

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArtists.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getArtists.fulfilled, (state, {payload: artists}) => {
        state.loading = false;
        state.artists = artists;
        state.error = false;
      })
      .addCase(getArtists.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const artistsReducer = artistsSlice.reducer;