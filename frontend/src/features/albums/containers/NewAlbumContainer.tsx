import AlbumForm from '../components/AlbumForm/AlbumForm.tsx';
import { IAlbumMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { addAlbum } from '../albumsThunk.ts';
import { userFromSlice } from '../../users/usersSlice.ts';
import { toast } from 'react-toastify';

const NewAlbumContainer = () => {
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addNewAlbum = (album: IAlbumMutation) => {
    if (user) {
      dispatch(addAlbum({album, token: user.token}));
      toast.success('Album was successfully added!');
      navigate('/');
    }
  };

  return (
    <>
      <AlbumForm addNewAlbum={addNewAlbum}/>
    </>
  );
};

export default NewAlbumContainer;