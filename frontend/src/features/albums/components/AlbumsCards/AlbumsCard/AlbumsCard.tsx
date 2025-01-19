import { IAlbum } from '../../../../../types';
import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import noImageAvailable from '../../../../../assets/noImageAvailable.png';
import { apiUrl } from '../../../../../globalConstants.ts';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../app/hooks.ts';
import { userFromSlice } from '../../../../users/usersSlice.ts';
import { toast } from 'react-toastify';

interface Props {
  album: IAlbum;
}

const AlbumsCard:React.FC<Props> = ({album}) => {
  const user = useAppSelector(userFromSlice);
  const navigate = useNavigate();
  let albumImage = noImageAvailable;

  if (album.image) {
    albumImage = apiUrl + "/" + album.image;
  }

  const getTracks = (id: string) => {
    if (user) {
      navigate(`/tracks/${id}`);
    } else {
      toast.error(`You can not listen to ${album.title} album. If you want to listen please sign in!`);
      navigate(`/login`);
    }
  };

  return (
    <Card sx={{ width: "260px", margin: '20px 0'}} onClick={() => getTracks(album._id)}>
      <AspectRatio minHeight="300px" maxHeight="350px">
        <img
          style={{width: '230px'}}
          src={albumImage}
          srcSet={albumImage}
          loading="lazy"
          alt={album.title}
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div style={{width: '100%', textAlign: 'center' }}>
          <Typography level="h3">{album.title}</Typography>
          <Typography level="body-md">
            Release: {album.releaseDate}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlbumsCard;