import React from 'react';
import { type Prefecture } from '../api/resas_api';

interface PrefectureListProps {
  Prefectures: Prefecture[];
}

const PrefectureList: React.FC<PrefectureListProps> = (props) => {
  const { Prefectures: prefectures } = props; // Add this line to destructure the prefectures prop

  return (
    <ul>
      {prefectures.map(
        (
          prefecture: Prefecture, // Add the type annotation for the prefecture parameter
        ) => (
          <li key={prefecture.prefCode}>{prefecture.prefName}</li>
        ),
      )}
    </ul>
  );
};

export default PrefectureList;
