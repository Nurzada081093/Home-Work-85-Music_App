import { ITrackHistory } from '../../../../../types';
import React from 'react';
import noPhoto from '../../../../../assets/noPhoto.jpg';
import { apiUrl } from '../../../../../globalConstants.ts';
import { styled } from '@mui/joy';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
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
  trackHistory: ITrackHistory;
}

const TrackHistoryCard: React.FC<Props> = ({trackHistory}) => {
  let artistImage = noPhoto;

  if (trackHistory.artist.image) {
    artistImage = apiUrl + "/" + trackHistory.artist.image;
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative', p: '10px 30px' }}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box sx={{width: '600px', display: 'flex', alignItems: 'center'}}>
            <img
              style={{height: '100px', width: '80px', borderRadius: '5px'}}
              src={artistImage}
              srcSet={artistImage}
              loading="lazy"
              alt={trackHistory.artist.name}
            />
            <Box sx={{marginLeft: '20px'}}>
              <Typography noWrap sx={{fontSize: '23px', color: 'black'}}>
                <b>{trackHistory.track.title}</b>
              </Typography>
              <Typography
                variant="caption"
                sx={{color: 'text.secondary', fontSize: '17px'}}
              >
                <b>{trackHistory.artist.name}</b>
              </Typography>
            </Box>
          </Box>
          <Box sx={{margin: '10px 10px 0 0'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <CalendarMonthIcon/>
              <Typography noWrap sx={{letterSpacing: -0.25, color: 'text.secondary', fontSize: 16, marginLeft: '10px'}}>{dayjs(trackHistory.datetime).format('DD.MM.YYYY')}</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
              <AccessTimeIcon/>
              <Typography noWrap sx={{letterSpacing: -0.25, color: 'text.secondary', fontSize: 16, marginLeft: '10px'}}>{dayjs(trackHistory.datetime).format(' HH:mm:ss')}</Typography>
            </Box>
          </Box>
        </Box>
      </Widget>
    </Box>
  );
};

export default TrackHistoryCard;