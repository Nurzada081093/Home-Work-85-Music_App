import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { SliceArtists, SliceLoading } from '../artistsSlice.ts';
import { useEffect } from 'react';
import { getArtists } from '../artistsThunk.ts';
import { Container } from '@mui/material';
import ArtistsCards from '../component/ArtistsCards/ArtistsCards.tsx';
import Box from '@mui/material/Box';
import Loading from '../../../components/UI/Loading/Loading.tsx';
import Typography from '@mui/joy/Typography';
import { IArtist } from '../../../types';
import { userFromSlice } from '../../users/usersSlice.ts';
import { useNavigate } from 'react-router-dom';

const ArtistsContainer = () => {
  const allArtists = useAppSelector(SliceArtists);
  const user = useAppSelector(userFromSlice);
  const loading = useAppSelector(SliceLoading);
  const dispatch = useAppDispatch();
  const publishedArtists:IArtist[] = [];
  const noPublishedArtists:IArtist[] = [];
  const navigate = useNavigate();

  allArtists.forEach((artist) => {
    if (artist.isPublished) {
      publishedArtists.push(artist);
    } else {
      if (user && user._id === artist.user) {
        noPublishedArtists.push(artist);
      }
    }
  });

  useEffect(() => {
    dispatch(getArtists());

    if (user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [dispatch, navigate, user]);

  return (
    <>
      {loading ? <Loading/> :
        <Container>
          <Box sx={{margin: '40px 10%'}}>
            {publishedArtists.length > 0 ?  <ArtistsCards artists={publishedArtists}/> :
              <Typography level="h2" sx={{textAlign: 'center', margin: '18% 0', color: 'whitesmoke', fontSize: '40px', fontStyle: 'italic'}}>No artists yet!</Typography>
            }
          </Box>
          {noPublishedArtists.length > 0 ?
            <Box sx={{margin: '40px 10%'}}>
              <ArtistsCards artists={noPublishedArtists}/>
            </Box>
            :
           null
          }
        </Container>
      }
    </>
  );
};

export default ArtistsContainer;