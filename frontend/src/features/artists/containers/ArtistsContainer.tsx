import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { SliceArtists, SliceLoading } from '../artistsSlice.ts';
import { useEffect } from 'react';
import { getArtists } from '../artistsThunk.ts';
import { Container } from '@mui/material';
import ArtistsCards from '../component/ArtistsCards/ArtistsCards.tsx';
import Box from '@mui/material/Box';
import Loading from '../../../components/UI/Loading/Loading.tsx';
import Typography from '@mui/joy/Typography';

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
            {allArtists.length > 0 ?  <ArtistsCards artists={allArtists}/> :
              <Typography level="h2" sx={{textAlign: 'center', margin: '18% 0', color: 'whitesmoke', fontSize: '40px', fontStyle: 'italic'}}>No artists yet!</Typography>
            }
          </Box>
        </Container>
      }
    </>
  );
};

export default ArtistsContainer;