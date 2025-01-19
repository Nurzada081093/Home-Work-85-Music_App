import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { trackHistoryFromSlice } from '../../trackHistoriesSlice.ts';
import { useEffect } from 'react';
import { userFromSlice } from '../../../users/usersSlice.ts';
import { getTrackHistories } from '../../trackHistoriesThunk.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const TrackHistoryContainer = () => {
  const user = useAppSelector(userFromSlice);
  const trackHistories = useAppSelector(trackHistoryFromSlice);
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

  console.log(trackHistories);

  return (
    <div>

    </div>
  );
};

export default TrackHistoryContainer;