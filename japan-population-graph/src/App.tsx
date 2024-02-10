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
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const prefectures = await fetchPrefectures();
        setPrefectures(prefectures.result);
        setError(null);
      } catch (err) {
        setError(String(err));
      }
    };
    void fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (selectedPrefectures.length === 0) {
        return;
      }
      const selectedPrefecturesCodes = selectedPrefectures.map((p) => p.prefCode);
      try {
        const prefecturePopulations = await fetchPrefecturePopulations(selectedPrefecturesCodes);
        setPrefecturePopulations(prefecturePopulations);
        setError(null);
      } catch (err) {
        setError(String(err));
      }
    };
    void fetchData();
  }, [selectedPrefectures]);

  return (
    <div className="App">
      <header>
        <h1>都道府県別の総人口推移グラフ</h1>
      </header>
      {error != null && <div className="error-message">{error}</div>}
      <main>
        <div className="margin-bottom-20">
          {prefecturePopulations != null && (
            <PopulationGraph prefecturePopulations={prefecturePopulations} prefectures={prefectures} />
          )}
        </div>
        <PrefectureCheckBoxList
          prefectures={prefectures}
          selectedPrefectures={selectedPrefectures}
          setSelectedPrefectures={setSelectedPrefectures}
        />
      </main>
    </div>
  );
}

export default App;
