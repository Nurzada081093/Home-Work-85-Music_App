import ArtistForm from '../component/ArtistForm/ArtistForm.tsx';
import { IArtistMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { userFromSlice } from '../../users/usersSlice.ts';
import { addArtist } from '../artistsThunk.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewArtistContainer = () => {
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addNewArtist = (artist: IArtistMutation) => {
    if (user !== null) {
      dispatch(addArtist({artist, token: user.token}));
      toast.success('Artist was successfully added!');
      navigate('/artists');
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <ArtistForm addNewArtist={addNewArtist}/>
    </>
  );
};

export default NewArtistContainer;