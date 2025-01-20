import { createSlice } from '@reduxjs/toolkit';
import { ITrackHistory } from '../../types';
import { addTrackHistory, getTrackHistories } from './trackHistoriesThunk.ts';
import { RootState } from '../../app/store.ts';

interface trackHistoryState {
  trackHistories: ITrackHistory[];
  loadings: {
    addTrackHistory: boolean;
    getTrackHistory: boolean;
  };
  trackHistoryError: boolean;
}

const initialState: trackHistoryState = {
  trackHistories: [],
  loadings: {
    addTrackHistory: false,
    getTrackHistory: false,
  },
  trackHistoryError: false,
};

export const trackHistoryFromSlice = (state: RootState) => state.trackHistories.trackHistories;
export const getTrackHistoryLoadingFromSlice = (state: RootState) => state.trackHistories.loadings.addTrackHistory;

const trackHistoriesSlice = createSlice({
  name: 'trackHistories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTrackHistory.pending, (state) => {
        state.loadings.addTrackHistory = true;
        state.trackHistoryError = false;
      })
      .addCase(addTrackHistory.fulfilled, (state) => {
        state.loadings.addTrackHistory = false;
        state.trackHistoryError = false;
      })
      .addCase(addTrackHistory.rejected, (state) => {
        state.loadings.addTrackHistory = false;
        state.trackHistoryError = true;
      })
      .addCase(getTrackHistories.pending, (state) => {
        state.loadings.getTrackHistory = true;
        state.trackHistoryError = false;
      })
      .addCase(getTrackHistories.fulfilled, (state, {payload: trackHistories}) => {
        state.loadings.getTrackHistory = false;
        state.trackHistoryError = false;
        state.trackHistories = trackHistories;
      })
      .addCase(getTrackHistories.rejected, (state) => {
        state.loadings.getTrackHistory = false;
        state.trackHistoryError = true;
      });
  }
});

export const trackHistoriesReducer = trackHistoriesSlice.reducer;