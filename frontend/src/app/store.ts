import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../features/artists/artistsSlice.ts';
import { albumsReducer } from '../features/albums/albumsSlice.ts';
import { tracksReducer } from '../features/tracks/tracksSlice.ts';
import { usersReducer } from '../features/users/usersSlice.ts';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { trackHistoriesReducer } from '../features/trackHistories/trackHistoriesSlice.ts';

const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  trackHistories: trackHistoriesReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;