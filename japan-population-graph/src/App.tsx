import './App.css';
import React, { useEffect, useState } from 'react';
import { fetchPrefectures, type Prefecture } from './api/resas_api';
import PrefectureList from './parts/prefectureList';

function App(): JSX.Element {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

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
      <PrefectureList Prefectures={prefectures} />
    </div>
  );
}

export default App;
