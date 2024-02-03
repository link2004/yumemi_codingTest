import { render, screen } from '@testing-library/react';
import { fetchPrefectures } from './api/fetchPrefectures';
import { fetchPrefecturePopulation, type PrefecturePopulation } from './api/fetchPrefecturesPopulation';
import { fetchPrefecturePopulations } from './api/fetchPrefecturesPopulation';
import PopulationGraph from './parts/populationGraph';
import App from './App';
test('fetchPrefectures', async () => {
  await expect(fetchPrefectures()).resolves.toBeDefined();
});

test('fetchPrefecturePopulation', async () => {
  const result = await fetchPrefecturePopulation(1);
  // resultがundefinedでないことを確認
  expect(result).toBeDefined();
  expect(result.prefCode).toBe(1);
  expect(result.populationResponse).toBeDefined();
  expect(result.populationResponse.result).toBeDefined();
  expect(result.populationResponse.result.boundaryYear).toBeDefined();
  expect(result.populationResponse.result.data).toBeDefined();
  expect(result.populationResponse.result.data[0].label).toBeDefined();
  expect(result.populationResponse.result.data[0].data).toBeDefined();
  expect(result.populationResponse.result.data[0].data[0].year).toBeDefined();
  expect(result.populationResponse.result.data[0].data[0].value).toBeDefined();
});

test('fetchPrefecturePopulations', async () => {
  const result = await fetchPrefecturePopulations([1, 2]);
  expect(result).toBeDefined();
  expect(result.length).toBe(2);
  expect(result[0].prefCode).toBe(1);
  expect(result[1].prefCode).toBe(2);
  expect(result[0].populationResponse).toBeDefined();
  expect(result[1].populationResponse).toBeDefined();
});

test('Appが表示されるか', () => {
  render(<App />);
  const linkElement = screen.getByText(/React App/i);
  expect(linkElement).toBeInTheDocument();
});

test('PopulationGraphが表示されるか', () => {
  const mockPrefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ];
  const mockPopulations: PrefecturePopulation[] = [
    {
      prefCode: 1,
      populationResponse: {
        message: '',
        result: {
          boundaryYear: 2020,
          data: [
            {
              label: '総人口',
              data: [
                { year: 1980, value: 12817 },
                { year: 1985, value: 12707 },
                { year: 1990, value: 12571 },
              ],
            },
            { label: '年少人口', data: [] },
          ],
        },
      },
    },
    {
      prefCode: 2,
      populationResponse: {
        message: '',
        result: {
          boundaryYear: 2020,
          data: [
            {
              label: '総人口',
              data: [
                { year: 1980, value: 12817 },
                { year: 1985, value: 12707 },
                { year: 1990, value: 12571 },
              ],
            },
            { label: '年少人口', data: [] },
          ],
        },
      },
    },
  ];

  render(<PopulationGraph prefecturePopulations={mockPopulations} prefectures={mockPrefectures} />);

  // HighchartsReactが表示されているか
  const highchartsElement = screen.getByTestId('highcharts-container');
  expect(highchartsElement).toBeInTheDocument();
});
