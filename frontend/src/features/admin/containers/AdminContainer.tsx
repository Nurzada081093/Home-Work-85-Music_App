import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { SliceArtists } from '../../artists/artistsSlice.ts';
import { useEffect } from 'react';
import { getArtists } from '../../artists/artistsThunk.ts';
import { Container } from '@mui/material';
import ArtistsCards from '../../artists/component/ArtistsCards/ArtistsCards.tsx';
import Box from '@mui/material/Box';

const AdminContainer = () => {
  const artists = useAppSelector(SliceArtists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <Container>
      <Box sx={{marginTop: '20px'}}>
        <ArtistsCards artists={artists}/>
      </Box>

    </Container>
  );
};

export default AdminContainer;