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
    <ul style={{ listStyleType: 'none' }}>
      {_prefectures.map(
        (
          prefecture: Prefecture, // Add the type annotation for the prefecture parameter
        ) => (
          <li key={prefecture.prefCode}>
            <label>
              <input type="checkbox" onChange={handleCheckboxChange} value={prefecture.prefCode} />
              {prefecture.prefName}
            </label>
          </li>
        ),
      )}
    </ul>
  );
};

export default PrefectureList;
