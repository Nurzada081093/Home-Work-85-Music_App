import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { SliceAlbums, SliceLoading } from '../albumsSlice.ts';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbums } from '../albumsThunk.ts';
import Typography from '@mui/joy/Typography';
import { Container } from '@mui/material';
import AlbumsCards from '../components/AlbumsCards/AlbumsCards.tsx';
import Loading from '../../../components/UI/Loading/Loading.tsx';
import { IAlbum } from '../../../types';
import { userFromSlice } from '../../users/usersSlice.ts';

const AlbumsContainer = () => {
  const user = useAppSelector(userFromSlice);
  const albums = useAppSelector(SliceAlbums);
  const loading = useAppSelector(SliceLoading);
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const publishedAlbums:IAlbum[] = [];
  const noPublishedAlbums:IAlbum[] = [];

  albums.forEach((album) => {
    if (album.isPublished) {
      publishedAlbums.push(album);
    } else {
      if (user && user._id === album.user) {
        noPublishedAlbums.push(album);
      }
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(getAlbums(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {loading ? <Loading/> :
        <Container>
          {user && user.role === 'admin' ? <AlbumsCards albums={albums} /> :
          <>
            {albums && albums.length > 0 && (<Typography level="h1" sx={{textAlign: 'center', margin: '20px 0', color: 'whitesmoke', fontSize: '40px'}}>{albums[0].artist.name}</Typography>)}
            {publishedAlbums.length > 0 ? <AlbumsCards albums={publishedAlbums} /> : <Typography level="h1" sx={{textAlign: 'center', margin: '30px 0', color: 'whitesmoke', fontSize: '40px'}}>No published albums yet!</Typography>}
            {noPublishedAlbums.length > 0 ? <AlbumsCards albums={noPublishedAlbums} /> : null}
          </>
          }
        </Container>
      }
    </>
  );
};

export default AlbumsContainer;