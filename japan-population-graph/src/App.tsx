import './App.css';
import React, { useEffect, useState } from 'react';
import { fetchPrefectures, type Prefecture } from './api/fetchPrefectures';
import { fetchPrefecturePopulation, type PopulationResponse } from './api/fetchPrefecturesPopulation';
import PrefectureCheckBoxList from './parts/prefectureCheckBoxList';
import PopulationGraph from './parts/populationGraph';
function App(): JSX.Element {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);
  const [populationData, setPopulationData] = useState<PopulationResponse['result']>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const prefectures = await fetchPrefectures();
      setPrefectures(prefectures.result);
      const populationData = await fetchPrefecturePopulation(1);
      setPopulationData(populationData.result);
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
      {populationData != null && <PopulationGraph populationData={populationData} />}
      <PrefectureCheckBoxList
        prefectures={prefectures}
        selectedPrefectures={selectedPrefectures}
        setSelectedPrefectures={setSelectedPrefectures}
      />
    </div>
  );
}

export default App;
