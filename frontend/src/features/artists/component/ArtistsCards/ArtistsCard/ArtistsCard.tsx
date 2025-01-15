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

interface Props {
  artist: IArtist;
}

const ArtistsCard:React.FC<Props> = ({artist}) => {
  const navigate = useNavigate();
  let artistImage = noPhoto;

  if (artist.image) {
    artistImage = apiUrl + "/" + artist.image;
  }

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
      <CardContent sx={{margin: '10px 0 0 10px'}}>
        <Typography textColor="success.plainColor" sx={{ fontWeight: 'md', fontSize: '30px' }}>
          {artist.name}
        </Typography>
        {artist.description ? <Typography level="body-sm">{artist.description}</Typography> : null}
      </CardContent>
    </Card>
  );
};

export default ArtistsCard;