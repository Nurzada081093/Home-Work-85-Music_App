import { createSlice } from '@reduxjs/toolkit';
import { ITrack } from '../../types';
import { getTracks } from './tracksThunk.ts';
import { RootState } from '../../app/store.ts';

interface TracksSlice {
  tracks: ITrack[],
  loading: boolean;
  error: boolean;
}

const initialState: TracksSlice = {
  tracks: [],
  loading: false,
  error: false,
};

export const SliceTracks = (state: RootState) => state.tracks.tracks;
export const SliceLoading = (state: RootState) => state.tracks.loading;

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTracks.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getTracks.fulfilled, (state, {payload: tracks}) => {
        state.loading = false;
        state.error = false;
        state.tracks = tracks;
      })
      .addCase(getTracks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export const tracksReducer = tracksSlice.reducer;