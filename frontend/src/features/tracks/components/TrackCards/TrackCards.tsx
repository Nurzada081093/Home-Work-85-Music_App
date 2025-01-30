import React from 'react';
import TracksCard from './TracksCard/TracksCard.tsx';
import { ITrack } from '../../../../types';

interface Props {
  tracks: ITrack[];
}

const TrackCards:React.FC<Props> = ({tracks}) => {
  return (
    <>
      {tracks.map((track) => (
        <TracksCard key={track._id} track={track}/>
      ))}
    </>
  );
};

export default TrackCards;