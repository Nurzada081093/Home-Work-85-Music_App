import { ITrackHistory } from '../../../../types';
import React from 'react';
import TrackHistoryCard from './TrackHistoryCard/TrackHistoryCard.tsx';

interface Props {
  trackHistories: ITrackHistory[];
}

const TrackHistoryCards:React.FC<Props> = ({trackHistories}) => {
  return (
    <>
      {trackHistories.map((trackHistory) => (
        <TrackHistoryCard key={trackHistory._id} trackHistory={trackHistory} />
      ))}
    </>
  );
};

export default TrackHistoryCards;