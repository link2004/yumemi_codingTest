import './App.css';
import React, { useState } from 'react';
import { type Prefecture } from './api/fetchPrefectures';
import PrefectureCheckBoxList from './components/templetes/prefectureCheckBoxList';
import PopulationGraph from './components/templetes/populationGraph';
import ErrorAlert from './components/templetes/errorAlert';
import { usePrefectures } from './hooks/usePrefectures';
import { usePrefecturePopulations } from './hooks/usePrefecturePopulations';
import Loading from './components/parts/loading';

function App(): JSX.Element {
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);
  const { prefectures, error: prefectureError } = usePrefectures();
  const { prefecturePopulations, error: populationsError } = usePrefecturePopulations(selectedPrefectures, prefectures);

  const isLoadingPrefectures = (prefectures == null || prefectures.length === 0) && prefectureError == null;
  const isLoadingPopulations = prefecturePopulations == null && populationsError == null;
  const isLoadedPrefectures = prefectures != null && prefectures.length > 0;
  const isLoadedPopulations = prefecturePopulations != null && prefecturePopulations.length > 0;

  return (
    <div className="App">
      <header>
        <h1>都道府県別の総人口推移グラフ</h1>
      </header>
      <ErrorAlert populationsError={populationsError} prefectureError={prefectureError} />
      <main>
        {/* グラフ */}
        <div className="margin-bottom-20">
          {isLoadingPopulations && <Loading data-testid="population-loading" />}
          {isLoadedPopulations && (
            <div data-testid="population-graph">
              <PopulationGraph prefecturePopulations={prefecturePopulations} prefectures={prefectures} />
            </div>
          )}
        </div>
        {/* 都道府県選択 */}
        {isLoadingPrefectures && <Loading data-testid="prefecture-loading" />}
        {isLoadedPrefectures && (
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
