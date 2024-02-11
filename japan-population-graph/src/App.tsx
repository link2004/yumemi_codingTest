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
  const updatePrefectures = async (): Promise<void> => {
    try {
      const prefectures = await fetchPrefectures();
      setPrefectures(prefectures.result);
      setError(null);
    } catch (err) {
      setError(String(err));
    }
  };
  const updatePrefecturePopulations = async (): Promise<void> => {
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
  useEffect(() => {
    void updatePrefectures();
  }, []);

  useEffect(() => {
    void updatePrefecturePopulations();
  }, [selectedPrefectures]);

  useEffect(() => {
    // 初期状態として北海道のグラフを表示
    const init = async (): Promise<void> => {
      if (prefectures.length > 0 && selectedPrefectures.length === 0) {
        setSelectedPrefectures([prefectures[0]]);
        await updatePrefecturePopulations();
        setSelectedPrefectures([]);
      }
    };
    void init();
  }, [prefectures]);
  return (
    <div className="App">
      <header>
        <h1>都道府県別の総人口推移グラフ</h1>
      </header>
      {error != null && (
        <div className="error-message" data-testid="error-message">
          {error}
        </div>
      )}
      <main>
        <div className="margin-bottom-20">
          {prefecturePopulations == null && error == null && (
            <div className="loading" data-testid="population-loading" />
          )}
          {prefecturePopulations != null && (
            <div data-testid="population-graph">
              <PopulationGraph prefecturePopulations={prefecturePopulations} prefectures={prefectures} />
            </div>
          )}
        </div>
        {(prefectures === undefined || prefectures.length === 0) && error == null && (
          <div className="loading" data-testid="prefecture-loading" />
        )}
        {!(prefectures === undefined || prefectures.length === 0) && (
          <div data-testid="prefecture-list">
            <PrefectureCheckBoxList
              prefectures={prefectures}
              selectedPrefectures={selectedPrefectures}
              setSelectedPrefectures={setSelectedPrefectures}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
