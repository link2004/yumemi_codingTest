import { useState, useEffect } from 'react';
import { fetchPrefecturePopulations, type PrefecturePopulation } from '../api/fetchPrefecturesPopulation';
import { type Prefecture } from '../api/fetchPrefectures';

interface returnObj {
  prefecturePopulations: PrefecturePopulation[] | null;
  error: string | null;
}

export const usePrefecturePopulations = (selectedPrefectures: Prefecture[], prefectures: Prefecture[]): returnObj => {
  const [prefecturePopulations, setPrefecturePopulations] = useState<PrefecturePopulation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updatePrefecturePopulations = async (): Promise<void> => {
    if (selectedPrefectures.length === 0) {
      return;
    }
    try {
      const selectedPrefecturesCodes = selectedPrefectures.map((p) => p.prefCode);
      const populations = await fetchPrefecturePopulations(selectedPrefecturesCodes);
      setPrefecturePopulations(populations);
      setError(null);
    } catch (err) {
      setError(String(err));
    }
  };
  useEffect(() => {
    void updatePrefecturePopulations();
  }, [selectedPrefectures]);

  useEffect(() => {
    // 初期状態として北海道のグラフを表示
    const initGraph = async (): Promise<void> => {
      try {
        if (prefectures.length > 0 && selectedPrefectures.length === 0) {
          const populations = await fetchPrefecturePopulations([prefectures[0].prefCode]);
          setPrefecturePopulations(populations);
        }
        setError(null);
      } catch (err) {
        setError(String(err));
      }
    };
    void initGraph();
  }, [prefectures]);

  return { prefecturePopulations, error };
};
