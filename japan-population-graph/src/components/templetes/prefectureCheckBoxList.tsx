import './prefectureCheckBoxList.css';
import React from 'react';
import { type Prefecture } from '../../api/fetchPrefectures';
import Checkbox from '../parts/checkbox';
import { usePrefectureSelection } from './hooks/usePrefectureSelection';

interface PrefectureListProps {
  prefectures: Prefecture[];
  selectedPrefectures: Prefecture[];
  setSelectedPrefectures: (prefectures: Prefecture[]) => void;
}

const PrefectureList: React.FC<PrefectureListProps> = (props) => {
  const {
    prefectures: _prefectures,
    selectedPrefectures: _selectedPrefectures,
    setSelectedPrefectures: _setSelectedPrefectures,
  } = props;

  const handleCheckboxChange = usePrefectureSelection({
    prefectures: _prefectures,
    selectedPrefectures: _selectedPrefectures,
    setSelectedPrefectures: _setSelectedPrefectures,
  });

  return (
    <div className="prefectureList">
      {_prefectures.map((prefecture: Prefecture) => (
        <Checkbox
          key={prefecture.prefCode}
          label={prefecture.prefName}
          value={prefecture.prefCode}
          handleCheckboxChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
};

export default PrefectureList;
