import React from 'react';
import { apiUrl } from '../../../../../globalConstants.ts';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { IArtist } from '../../../../../types';
import noPhoto from '../../../../../assets/noPhoto.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks.ts';
import { userFromSlice } from '../../../../users/usersSlice.ts';
import { deleteArtist, getArtists, publishArtist } from '../../../artistsThunk.ts';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';

interface Props {
  artist: IArtist;
}

const ArtistsCard:React.FC<Props> = ({artist}) => {
  const user = useAppSelector(userFromSlice);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let artistImage = noPhoto;

  if (artist.image) {
    artistImage = apiUrl + "/" + artist.image;
  }

  const deleteThisArtist = async (artistId: string) => {
    if (user && user.role === 'user') {
      await dispatch(deleteArtist({artistId, token: user.token}));
      await dispatch(getArtists());
      toast.success('Artist was successfully deleted!');
      navigate('/');
    }
  };

  const deleteAdminTheArtist = async (artistId: string) => {
    if (user && user.role === 'admin') {
      await dispatch(deleteArtist({artistId, token: user.token}));
      await dispatch(getArtists());
      toast.success('Artist was successfully deleted!');
      navigate('/admin');
    }
  };

  const publishAdminTheArtist = async (artistId: string) => {
    if (user && user.role === 'admin') {
      await dispatch(publishArtist({artistId, token: user.token})).unwrap();
      await dispatch(getArtists());
      toast.success('Artist was successfully published!');
      navigate('/admin');
    }
  };

  return (
    <Card orientation="horizontal" variant="outlined" sx={{ width: '100%', marginBottom: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }} onClick={() => navigate(`/albums/${artist._id}`)}>
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: '200px'}}>
          <img
            style={{height: '100%'}}
            src={artistImage}
            srcSet={artistImage}
            loading="lazy"
            alt={artist.name}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography textColor="success.plainColor" sx={{ fontWeight: 'md', fontSize: '30px' }}>
          {artist.name}
        </Typography>
        {artist.description ? <Typography level="body-sm">{artist.description}</Typography> : null}
        {user && user.role !== 'admin' && !artist.isPublished ? (
          <Button variant="text" sx={{width: '100px'}} onClick={() => deleteThisArtist(artist._id)}>Delete</Button>)
        :
          <>
            {user !== null && user.role === 'admin' && (
            <Box>
              <Button variant="text" sx={{width: '100px'}} onClick={() => deleteAdminTheArtist(artist._id)}>Delete</Button>
              <Button variant="text" sx={{width: '100px'}} onClick={() => publishAdminTheArtist(artist._id)}>Publish</Button>
            </Box>
          )}
          </>
        }
      </CardContent>
      {!artist.isPublished && (
        <CardOverflow
          variant="soft"
          color="primary"
          sx={{
            px: 0.2,
            writingMode: 'vertical-rl',
            justifyContent: 'center',
            fontSize: 'xs',
            fontWeight: 'xl',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            borderLeft: '1px solid',
            borderColor: 'divider',
          }}
        >
          No published
        </CardOverflow>
      )}
    </Card>
  );
};

export default ArtistsCard;