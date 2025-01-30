import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { SliceAlbums, SliceLoading } from '../albumsSlice.ts';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbums } from '../albumsThunk.ts';
import Typography from '@mui/joy/Typography';
import { Container } from '@mui/material';
import AlbumsCards from '../components/AlbumsCards/AlbumsCards.tsx';
import Loading from '../../../components/UI/Loading/Loading.tsx';

const AlbumsContainer = () => {
  const albums = useAppSelector(SliceAlbums);
  const loading = useAppSelector(SliceLoading);
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getAlbums(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {loading ? <Loading/> :
        <Container>
          {albums && albums.length > 0 && (<Typography level="h1" sx={{textAlign: 'center', margin: '20px 0', color: 'whitesmoke', fontSize: '40px'}}>{albums[0].artist.name}</Typography>)}
          {albums.length > 0 ? <AlbumsCards albums={albums} /> : <Typography level="h1">No albums yet!</Typography>}
        </Container>
      }
    </>
  );
};

export default AlbumsContainer;