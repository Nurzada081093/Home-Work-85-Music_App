import { createSlice } from '@reduxjs/toolkit';
import { IArtist } from '../../types';

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

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
});

export const artistsReducer = artistsSlice.reducer;