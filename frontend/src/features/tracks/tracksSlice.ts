import { createSlice } from '@reduxjs/toolkit';
import { ITrack } from '../../types';
import { addTrack, getTracks } from './tracksThunk.ts';
import { RootState } from '../../app/store.ts';

interface TracksSlice {
  tracks: ITrack[],
  loadings: {
    getTracksLoading: boolean;
    addTrackLoading:  boolean;
    deleteTrackLoading: boolean;
  };
  error: boolean;
}

const initialState: TracksSlice = {
  tracks: [],
  loadings: {
    getTracksLoading: false,
    addTrackLoading:  false,
    deleteTrackLoading: false,
  },
  error: false,
};

export const SliceTracks = (state: RootState) => state.tracks.tracks;
export const SliceLoading = (state: RootState) => state.tracks.loadings.getTracksLoading;
export const SliceAddLoading = (state: RootState) => state.tracks.loadings.addTrackLoading;

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTracks.pending, (state) => {
        state.loadings.getTracksLoading = true;
        state.error = false;
      })
      .addCase(getTracks.fulfilled, (state, {payload: tracks}) => {
        state.loadings.getTracksLoading = false;
        state.error = false;
        state.tracks = tracks;
      })
      .addCase(getTracks.rejected, (state) => {
        state.loadings.getTracksLoading = false;
        state.error = true;
      })
      .addCase(addTrack.pending, (state) => {
        state.loadings.addTrackLoading = true;
        state.error = false;
      })
      .addCase(addTrack.fulfilled, (state) => {
        state.loadings.addTrackLoading = false;
        state.error = false;
      })
      .addCase(addTrack.rejected, (state) => {
        state.loadings.addTrackLoading = false;
        state.error = true;
      });
  }
});

export const tracksReducer = tracksSlice.reducer;