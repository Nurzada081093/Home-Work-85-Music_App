import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ITrack } from '../../../../types';
import { styled } from '@mui/joy';

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
  return (
    <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative', p: '20px 30px' }}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%'}}>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              Album name: «{track.album.title}»
            </Typography>
            <Typography noWrap>
              <b>{track.album.artist.name}</b>
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
              <Typography noWrap sx={{ letterSpacing: -0.25}}>
                {track.number}. {track.title}
              </Typography>
              <Typography noWrap sx={{letterSpacing: -0.25, color: 'text.secondary', fontSize: 14 }}>
                {track.trackDuration}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Widget>
    </Box>
  );
};

export default TracksCard;

