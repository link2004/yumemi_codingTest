import { type Prefecture } from '../../../api/fetchPrefectures';

interface UsePrefectureSelectionProps {
  prefectures: Prefecture[];
  selectedPrefectures: Prefecture[];
  setSelectedPrefectures: (prefectures: Prefecture[]) => void;
}

export const usePrefectureSelection = ({
  prefectures,
  selectedPrefectures,
  setSelectedPrefectures,
}: UsePrefectureSelectionProps): ((event: React.ChangeEvent<HTMLInputElement>) => void) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked, value } = event.target;
    const prefecture = prefectures.find((p) => p.prefCode.toString() === value);
    if (prefecture == null) {
      return;
    }
    if (checked) {
      setSelectedPrefectures([...selectedPrefectures, prefecture]);
    } else {
      const newSelectedPrefectures = selectedPrefectures.filter((p) => p.prefCode !== prefecture.prefCode);
      setSelectedPrefectures(newSelectedPrefectures);
    }
  };

  return handleCheckboxChange;
};
