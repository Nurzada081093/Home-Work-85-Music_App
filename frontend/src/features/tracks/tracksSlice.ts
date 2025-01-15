import { createSlice } from '@reduxjs/toolkit';
import { ITrack } from '../../types';

interface TracksSlice {
  tracks: ITrack[],
  loading: boolean;
  error: boolean;
}

const initialState: TracksSlice = {
  tracks: [],
  loading: false,
  error: false,
}

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {}
});

export const tracksReducer = tracksSlice.reducer;