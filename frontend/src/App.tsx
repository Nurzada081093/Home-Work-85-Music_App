import './App.css';
import ToolBar from './components/UI/ToolBar/ToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import ArtistsContainer from './features/artists/containers/ArtistsContainer.tsx';
import AlbumsContainer from './features/albums/containers/AlbumsContainer.tsx';
import Typography from '@mui/joy/Typography';
import TracksContainer from './features/tracks/containers/TracksContainer.tsx';
import RegisterContainer from './features/users/containers/RegisterContainer/RegisterContainer.tsx';
import LoginContainer from './features/users/containers/LoginContainer/LoginContainer.tsx';
import TrackHistoryContainer
  from './features/trackHistories/containers/TrackHistoryContainer/TrackHistoryContainer.tsx';
import NewArtistContainer from './features/artists/containers/NewArtistContainer.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import { useAppSelector } from './app/hooks.ts';
import { userFromSlice } from './features/users/usersSlice.ts';
import NewAlbumContainer from './features/albums/containers/NewAlbumContainer.tsx';
import NewTrackContainer from './features/tracks/containers/NewTrackContainer.tsx';

const App = () => {
  const user = useAppSelector(userFromSlice);

  return (
    <>
      <header>
        <ToolBar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ArtistsContainer/>} />
          <Route path="/artists" element={<ArtistsContainer/>} />
          <Route path="/artists/addNewArtist" element={
            <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}>
              <NewArtistContainer/>
            </ProtectedRoute>
          } />
          <Route path="/register" element={<RegisterContainer/>} />
          <Route path="/login" element={<LoginContainer/>} />
          <Route path="/albums/:id" element={<AlbumsContainer/>} />
          <Route path="/albums/addNewAlbum" element={
            <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}>
              <NewAlbumContainer/>
            </ProtectedRoute>
          } />
          <Route path="/tracks/:id" element={<TracksContainer/>} />
          <Route path="/tracks/addNewTrack" element={
            <ProtectedRoute isAllowed={user && (user.role === 'admin' || user.role === 'user')}>
              <NewTrackContainer/>
            </ProtectedRoute>
          } />
          <Route path="/trackHistory" element={<TrackHistoryContainer/>} />
          <Route path="*" element={<Typography textColor="success.plainColor" sx={{ fontWeight: 'md', fontSize: '30px' }}>
            Not found
          </Typography>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
