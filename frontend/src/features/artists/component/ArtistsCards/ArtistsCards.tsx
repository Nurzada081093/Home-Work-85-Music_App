import { IArtist } from '../../../../types';
import ArtistsCard from './ArtistsCard/ArtistsCard.tsx';
import React from 'react';

interface Props {
  artists: IArtist[];
}

const ArtistsCards:React.FC<Props> = ({artists}) => {
  return (
    <>
      {artists.map((artist: IArtist) => (
        <ArtistsCard key={artist._id} artist={artist} />
      ))}
    </>
  );
};

export default ArtistsCards;