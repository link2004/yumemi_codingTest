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
    <div>
      <p>React App</p>
      <span>selected Prefectures:</span>
      {selectedPrefectures.map((p) => (
        <span key={p.prefCode}>{p.prefName},</span>
      ))}
      {prefecturePopulations != null && (
        <PopulationGraph prefecturePopulations={prefecturePopulations} prefectures={prefectures} />
      )}
      <PrefectureCheckBoxList
        prefectures={prefectures}
        selectedPrefectures={selectedPrefectures}
        setSelectedPrefectures={setSelectedPrefectures}
      />
    </div>
  );
}

export default App;
