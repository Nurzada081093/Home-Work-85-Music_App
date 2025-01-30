import TrackForm from '../components/TrackForm/TrackForm.tsx';
import { ITrackMutation } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { addTrack } from '../tracksThunk.ts';
import { userFromSlice } from '../../users/usersSlice.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NewTrackContainer = () => {
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addNewTrack = (track: ITrackMutation) => {
    if (user) {
      dispatch(addTrack({track, token: user.token}));
      toast.success('Track was successfully added!');
      navigate('/');
    }

  };

  return (
    <>
      <TrackForm addNewTrack={addNewTrack}/>
    </>
  );
};

export default NewTrackContainer;