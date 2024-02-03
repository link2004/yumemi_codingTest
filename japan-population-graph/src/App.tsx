import './App.css';
import React, { useEffect, useState } from 'react';
import { fetchPrefectures, type Prefecture } from './api/fetchPrefectures';
import { fetchPrefecturePopulations, type PrefecturePopulation } from './api/fetchPrefecturesPopulation';
import PrefectureCheckBoxList from './parts/prefectureCheckBoxList';
import PopulationGraph from './parts/populationGraph';
function App(): JSX.Element {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);
  const [prefecturePopulations, setPrefecturePopulations] = useState<PrefecturePopulation[]>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const prefectures = await fetchPrefectures();
      setPrefectures(prefectures.result);
    };
    void fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (selectedPrefectures.length === 0) {
        return;
      }
      const selectedPrefecturesCodes = selectedPrefectures.map((p) => p.prefCode);
      const prefecturePopulations = await fetchPrefecturePopulations(selectedPrefecturesCodes);
      setPrefecturePopulations(prefecturePopulations);
    };
    void fetchData();
  }, [selectedPrefectures]);

  return (
    <div className="App">
      <header>
        <h1>都道府県別の総人口推移グラフ</h1>
      </header>
      <div className="container">
        {prefecturePopulations != null && (
          <PopulationGraph prefecturePopulations={prefecturePopulations} prefectures={prefectures} />
        )}
        {/* <span>選択：{selectedPrefectures.map((p) => p.prefName).join(', ')}</span> */}
        <PrefectureCheckBoxList
          prefectures={prefectures}
          selectedPrefectures={selectedPrefectures}
          setSelectedPrefectures={setSelectedPrefectures}
        />
      </div>
    </div>
  );
}

export default App;
