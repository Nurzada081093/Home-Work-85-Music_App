import './App.css';
import ToolBar from './components/UI/ToolBar/ToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import ArtistsContainer from './features/artists/containers/ArtistsContainer.tsx';
import AlbumsContainer from './features/albums/containers/AlbumsContainer/AlbumsContainer.tsx';
import Typography from '@mui/joy/Typography';
import TracksContainer from './features/tracks/containers/TracksContainer/TracksContainer.tsx';

const App = () => {

  return (
    <>
      <header>
        <ToolBar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ArtistsContainer/>} />
          <Route path="/albums/:id" element={<AlbumsContainer/>} />
          <Route path="/tracks/:id" element={<TracksContainer/>} />
          <Route path="*" element={<Typography textColor="success.plainColor" sx={{ fontWeight: 'md', fontSize: '30px' }}>
            Not found
          </Typography>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
