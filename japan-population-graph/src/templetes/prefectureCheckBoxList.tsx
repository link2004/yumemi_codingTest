import './prefectureCheckBoxList.css';
import React from 'react';
import { type Prefecture } from '../api/fetchPrefectures';

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
  } = props; // Add this line to destructure the prefectures prop

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked, value } = event.target;
    const prefecture = _prefectures.find((p) => p.prefCode.toString() === value);
    if (prefecture === undefined) {
      console.log('prefecture code:' + value + 'is not found');
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
          <div key={prefecture.prefCode} className="prefectureItem">
            <label>
              <input type="checkbox" onChange={handleCheckboxChange} value={prefecture.prefCode} />
              {prefecture.prefName}
            </label>
          </div>
        ),
      )}
    </div>
  );
};

export default PrefectureList;
