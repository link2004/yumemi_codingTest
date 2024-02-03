import './App.css';
import React, { useEffect, useState } from 'react';
import { fetchPrefectures, type Prefecture } from './api/fetchPrefectures';
import PrefectureList from './parts/prefectureCheckBoxList';

function App(): JSX.Element {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const data = await fetchPrefectures();
      setPrefectures(data.result);
    };
    void fetchData();
  }, []);
  return (
    <div>
      <p>React App</p>
      <span>selected Prefectures:</span>
      {selectedPrefectures.map((p) => (
        <span key={p.prefCode}>{p.prefName},</span>
      ))}
      <PrefectureList
        prefectures={prefectures}
        selectedPrefectures={selectedPrefectures}
        setSelectedPrefectures={setSelectedPrefectures}
      />
    </div>
  );
}

export default App;
