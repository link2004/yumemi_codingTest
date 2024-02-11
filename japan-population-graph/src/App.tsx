import './App.css';
import React, { useState } from 'react';
import { type Prefecture } from './api/fetchPrefectures';
import PrefectureCheckBoxList from './organisms/prefectureCheckBoxList';
import PopulationGraph from './organisms/populationGraph';
import ErrorAlert from './organisms/errorAlert';
import { usePrefectures } from './hooks/usePrefectures';
import { usePrefecturePopulations } from './hooks/usePrefecturePopulations';

function App(): JSX.Element {
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);
  const { prefectures, error: prefectureError } = usePrefectures();
  const { prefecturePopulations, error: populationsError } = usePrefecturePopulations(selectedPrefectures, prefectures);

  return (
    <div className="App">
      <header>
        <h1>都道府県別の総人口推移グラフ</h1>
      </header>
      <ErrorAlert populationsError={populationsError} prefectureError={prefectureError} />
      <main>
        <div className="margin-bottom-20">
          {prefecturePopulations == null && populationsError == null && (
            <div className="loading" data-testid="population-loading" />
          )}
          {prefecturePopulations != null && (
            <div data-testid="population-graph">
              <PopulationGraph prefecturePopulations={prefecturePopulations} prefectures={prefectures} />
            </div>
          )}
        </div>
        {(prefectures === undefined || prefectures.length === 0) && prefectureError == null && (
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
