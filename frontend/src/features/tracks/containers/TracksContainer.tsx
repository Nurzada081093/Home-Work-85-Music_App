import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { SliceLoading, SliceTracks } from '../tracksSlice.ts';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTracks } from '../tracksThunk.ts';
import { Container } from '@mui/material';
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import Loading from '../../../components/UI/Loading/Loading.tsx';
import { userFromSlice } from '../../users/usersSlice.ts';
import { toast } from 'react-toastify';
import TrackCards from '../components/TrackCards/TrackCards.tsx';
import { ITrack } from '../../../types';

const TracksContainer = () => {
  const user = useAppSelector(userFromSlice);
  const tracks = useAppSelector(SliceTracks);
  const loading = useAppSelector(SliceLoading);
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const navigate = useNavigate();
  const publishedTracks:ITrack[] = [];
  const noPublishedTracks:ITrack[] = [];

  tracks.forEach((track) => {
    if (track.isPublished) {
      publishedTracks.push(track);
    } else {
      if (user && user._id === track.user) {
        noPublishedTracks.push(track);
      }
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(getTracks(id));
    }
  }, [dispatch, id]);

  if (!user) {
    setTimeout(() => {
      toast.error(`You can not listen to ${tracks[0].album.title} album. If you want to listen please sign in!`);
      navigate('/login');
    }, 1000);
  }

  return (
    <>
      {loading ? <Loading/> :
        <Container>
          {tracks && tracks.length > 0 && (
            <Box sx={{marginBottom: '30px'}}>
              <Typography level="h2" sx={{textAlign: 'center', margin: '20px 0', color: 'whitesmoke', fontSize: '40px'}}>{tracks[0].album.artist.name}</Typography>
              <Typography level="h2" sx={{textAlign: 'center', margin: '20px 0', color: 'whitesmoke',}}>Album: «{tracks[0].album.title}»</Typography>
            </Box>
          )}
          <Box sx={{border: '1px solid white', width: '40%', borderRadius: '10px', margin: '30px auto 50px'}}>
            {publishedTracks.length > 0 ?
              <TrackCards tracks={publishedTracks}/> :
              <Typography level="h2" sx={{textAlign: 'center', margin: '40px 0', color: 'whitesmoke', fontSize: '40px'}}>No published tracks yet!</Typography>
            }
            {noPublishedTracks.length > 0 ?
              <TrackCards tracks={noPublishedTracks}/> : null
            }
          </Box>

        </Container>
      }
    </>
  );
};

export default TracksContainer;