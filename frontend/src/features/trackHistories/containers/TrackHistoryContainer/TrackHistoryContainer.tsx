import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { getTrackHistoryLoadingFromSlice, trackHistoryFromSlice } from '../../trackHistoriesSlice.ts';
import { useEffect } from 'react';
import { userFromSlice } from '../../../users/usersSlice.ts';
import { getTrackHistories } from '../../trackHistoriesThunk.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import TrackHistoryCards from '../../components/TrackHistoryCards/TrackHistoryCards.tsx';
import Loading from '../../../../components/UI/Loading/Loading.tsx';

const TrackHistoryContainer = () => {
  const user = useAppSelector(userFromSlice);
  const trackHistories = useAppSelector(trackHistoryFromSlice);
  const loading = useAppSelector(getTrackHistoryLoadingFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(getTrackHistories(user.token));
    } else {
      toast.error('You cannot visit this page. If you want to visit please sign in!');
      navigate('/login');
    }
  }, [dispatch, user, navigate]);

  return (
    <Container>
      <Typography level="h2" sx={{textAlign: 'center', margin: '20px 0', color: 'whitesmoke', fontSize: '40px', textTransform: 'uppercase'}}>Tracks history</Typography>
      {loading ? <Loading/> :
        <Box sx={{margin: '30px auto', width: '80%'}}>
          {trackHistories.length > 0 ? <TrackHistoryCards trackHistories={trackHistories} /> :
            <Typography level="h2" sx={{textAlign: 'center', margin: '18% 0', color: 'whitesmoke', fontSize: '40px', fontStyle: 'italic'}}>No tracks history yet!</Typography>
          }
        </Box>
      }
    </Container>
  );
};

export default TrackHistoryContainer;