import './App.css';
import React, { useEffect, useState } from 'react';
import { fetchPrefectures, type Prefecture } from './api/fetchPrefectures';
import { fetchPrefecturePopulation, type PrefecturePopulation } from './api/fetchPrefecturesPopulation';
import PrefectureCheckBoxList from './parts/prefectureCheckBoxList';
import PopulationGraph from './parts/populationGraph';
function App(): JSX.Element {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);
  const [prefecturePopulation, setPrefecturePopulation] = useState<PrefecturePopulation>();
  const [prefecturePopulation2, setPrefecturePopulation2] = useState<PrefecturePopulation>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const prefectures = await fetchPrefectures();
      setPrefectures(prefectures.result);
      const _prefecturePopulation = await fetchPrefecturePopulation(1);
      const _prefecturePopulation2 = await fetchPrefecturePopulation(2);
      setPrefecturePopulation(_prefecturePopulation);
      setPrefecturePopulation2(_prefecturePopulation2);
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
      {prefecturePopulation != null && prefecturePopulation2 != null && (
        <PopulationGraph
          prefecturePopulations={[prefecturePopulation, prefecturePopulation2]}
          prefectures={prefectures}
        />
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
