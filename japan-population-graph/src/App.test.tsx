import { fetchPrefectures } from './api/fetchPrefectures';
import { fetchPrefecturePopulation } from './api/fetchPrefecturesPopulation';

test('fetchPrefectures', async () => {
  await expect(fetchPrefectures()).resolves.toBeDefined();
});

test('fetchPrefecturePopulation', async () => {
  await expect(fetchPrefecturePopulation(1)).resolves.toBeDefined();
});
