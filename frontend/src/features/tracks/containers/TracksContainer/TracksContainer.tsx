import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { SliceLoading, SliceTracks } from '../../tracksSlice.ts';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTracks } from '../../tracksThunk.ts';
import { Container } from '@mui/material';
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';
import TracksCard from '../../components/TracksCard/TracksCard.tsx';
import Loading from '../../../../components/UI/Loading/Loading.tsx';

const TracksContainer = () => {
  const tracks = useAppSelector(SliceTracks);
  const loading = useAppSelector(SliceLoading);
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getTracks(id));
    }
  }, [dispatch, id]);

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
            {tracks.length > 0 ?
              tracks.map(track => (
                <TracksCard key={track._id} track={track} />
              )) :
              <Typography level="h2" sx={{textAlign: 'center', margin: '40px 0', color: 'whitesmoke', fontSize: '40px'}}>No tracks yet!</Typography>
            }
          </Box>
        </Container>
      }
    </>
  );
};

export default TracksContainer;