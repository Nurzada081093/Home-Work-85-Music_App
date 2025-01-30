import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITrack } from '../../../../../types';
import { styled } from '@mui/joy';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks.ts';
import { userFromSlice } from '../../../../users/usersSlice.ts';
import { addTrackHistory } from '../../../../trackHistories/trackHistoriesThunk.ts';
import ModalWindow from '../../../../../components/ModalWindow/ModalWindow.tsx';
import CloseIcon from '@mui/icons-material/Close';
import { getArtists } from '../../../../artists/artistsThunk.ts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { deleteTrack, publishTrack } from '../../../tracksThunk.ts';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: '400px',
  maxWidth: '100%',
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'rgba(251,251,251,0.73)',
  backdropFilter: 'blur(40px)',
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(0,0,0,0.79)',
  }),
}));

interface Props {
  track: ITrack;
}

const TracksCard:React.FC<Props> = ({track}) => {
  const [open, setOpen] = useState<boolean>(false);
  const user = useAppSelector(userFromSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getTrackHistory = (trackId: string) => {
    if (user) {
      setOpen(true);
      dispatch(addTrackHistory({track: trackId, token: user.token}));
    }
  };

  const deleteTheTrack = async (trackId: string) => {
    if (user) {
      await dispatch(deleteTrack({trackId, token: user.token}));
      await dispatch(getArtists());
      toast.success('Track was successfully deleted!');
      navigate('/');
    }
  };

  const publishedAdminTheTrack = async (trackId: string) => {
    if (user && user.role === 'admin') {
      await dispatch(publishTrack({trackId, token: user.token})).unwrap();
      await dispatch(getArtists());
      toast.success('Track was successfully published!');
      navigate('/admin');
    }
  };

  const deleteAdminTheTrack = async (trackId: string) => {
    if (user && user.role === 'admin') {
      await dispatch(deleteTrack({trackId, token: user.token}));
      await dispatch(getArtists());
      toast.success('Track was successfully deleted!');
      navigate('/admin');
    }
  };

  return (
    <>
      {track.url && (
        <ModalWindow openModal={open} closeModal={() => setOpen(false)} track={track}/>
      )}
      <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative', p: '20px 30px' }}>
        <Widget>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%'}}>
              {user && user.role !== 'admin' ?
              <>
                {!track.isPublished ?
                  <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography
                      variant="caption"
                      sx={{ color: 'rgba(243,8,79,0.79)', fontWeight: 500 }}
                    >
                      No published
                    </Typography>
                    <CloseIcon sx={{fontSize: 'medium'}} onClick={() => deleteTheTrack(track._id)}/>
                  </Box> : null
                }
              </> :
                <>
                  {
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      {!track.isPublished && (
                        <Typography
                          variant="caption"
                          sx={{ color: 'rgb(4,105,159)', fontWeight: 500 }}
                        >
                          No published
                        </Typography>
                      )}
                      <Box sx={{marginLeft: 'auto'}}>
                        <PublishedWithChangesIcon sx={{fontSize: 'medium'}} onClick={() => publishedAdminTheTrack(track._id)}/>
                        <CloseIcon sx={{fontSize: 'medium', marginLeft: '10px'}} onClick={() => deleteAdminTheTrack(track._id)}/>
                      </Box>
                    </Box>
                  }
                </>
              }
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontWeight: 500 }}
              >
                Album name: «{track.album.title}»
              </Typography>
              <Typography noWrap>
                <b>{track.album.artist.name}</b>
              </Typography>
              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <PlayArrowRounded sx={{ fontSize: '30px', marginRight: '5px'}} onClick={() => getTrackHistory(track._id)}/>
                  <Typography noWrap sx={{ letterSpacing: -0.25}}>
                    {track.number}. {track.title}
                  </Typography>
                </Box>
                <Typography noWrap sx={{letterSpacing: -0.25, color: 'text.secondary', fontSize: 14 }}>
                  {track.trackDuration}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Widget>
      </Box>
    </>
  );
};

export default TracksCard;

