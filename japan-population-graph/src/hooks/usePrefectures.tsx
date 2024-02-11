import { useState, useEffect } from 'react';
import { fetchPrefectures, type Prefecture } from '../api/fetchPrefectures';

interface returnObj {
  prefectures: Prefecture[];
  error: string | null;
}
export const usePrefectures = (): returnObj => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updatePrefectures = async (): Promise<void> => {
      try {
        const prefectures = await fetchPrefectures();
        setPrefectures(prefectures.result);
        setError(null);
      } catch (err) {
        setError(String(err));
      }
    };
    void updatePrefectures();
  }, []);

  return { prefectures, error };
};
