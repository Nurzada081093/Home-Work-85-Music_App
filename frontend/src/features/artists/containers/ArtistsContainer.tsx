import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { SliceArtists, SliceLoading } from '../artistsSlice.ts';
import { useEffect } from 'react';
import { getArtists } from '../artistsThunk.ts';
import { Container } from '@mui/material';
import ArtistsCards from '../component/ArtistsCards/ArtistsCards.tsx';
import Box from '@mui/material/Box';
import Loading from '../../../components/UI/Loading/Loading.tsx';

const ArtistsContainer = () => {
  const allArtists = useAppSelector(SliceArtists);
  const loading = useAppSelector(SliceLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  return (
    <>
      {loading ? <Loading/> :
        <Container>
          <Box sx={{margin: '40px 10%'}}>
            <ArtistsCards artists={allArtists}/>
          </Box>
        </Container>
      }
    </>
  );
};

export default ArtistsContainer;