import './prefectureCheckBoxList.css';
import React from 'react';
import { type Prefecture } from '../api/fetchPrefectures';
import Checkbox from '../parts/checkbox';

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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked, value } = event.target;
    const prefecture = _prefectures.find((p) => p.prefCode.toString() === value);
    if (prefecture === undefined) {
      return;
    }
    if (checked) {
      _setSelectedPrefectures([..._selectedPrefectures, prefecture]);
    } else {
      const newSelectedPrefectures = _selectedPrefectures.filter((p) => p.prefCode !== prefecture.prefCode);
      _setSelectedPrefectures(newSelectedPrefectures);
    }
  };

  return (
    <div className="prefectureList">
      {_prefectures.map(
        (
          prefecture: Prefecture, // Add the type annotation for the prefecture parameter
        ) => (
          <Checkbox
            key={prefecture.prefCode}
            label={prefecture.prefName}
            value={prefecture.prefCode}
            handleCheckboxChange={handleCheckboxChange}
          />
        ),
      )}
    </div>
  );
};

export default PrefectureList;
