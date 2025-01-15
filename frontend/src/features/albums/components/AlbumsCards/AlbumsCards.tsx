import { IAlbum } from '../../../../types';
import React from 'react';
import AlbumsCard from './AlbumsCard/AlbumsCard.tsx';
import Box from '@mui/material/Box';

interface Props {
  albums: IAlbum[];
}

const AlbumsCards:React.FC<Props> = ({albums}) => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
      {albums.map((album: IAlbum) => (
        <AlbumsCard key={album._id} album={album} />
      ))}
    </Box>
  );
};

export default AlbumsCards;