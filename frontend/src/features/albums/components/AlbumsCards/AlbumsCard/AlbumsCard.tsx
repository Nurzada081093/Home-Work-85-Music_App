import { IAlbum } from '../../../../../types';
import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import noImageAvailable from '../../../../../assets/noImageAvailable.png';
import { apiUrl } from '../../../../../globalConstants.ts';
import { useNavigate } from 'react-router-dom';

interface Props {
  album: IAlbum;
}

const AlbumsCard:React.FC<Props> = ({album}) => {
  const navigate = useNavigate();
  let albumImage = noImageAvailable;

  if (album.image) {
    albumImage = apiUrl + "/" + album.image;
  }

  return (
    <Card sx={{ width: "260px", margin: '20px 0'}} onClick={() => navigate(`/tracks/${album._id}`)}>
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