import { render, screen } from '@testing-library/react';
import { fetchPrefectures } from './api/fetchPrefectures';
import { fetchPrefecturePopulation, type PopulationResponse } from './api/fetchPrefecturesPopulation';
import PopulationGraph from './parts/populationGraph';
import App from './App';
test('fetchPrefectures', async () => {
  await expect(fetchPrefectures()).resolves.toBeDefined();
});

test('fetchPrefecturePopulation', async () => {
  await expect(fetchPrefecturePopulation(1)).resolves.toBeDefined();
});

test('Appが表示されるか', () => {
  render(<App />);
  const linkElement = screen.getByText(/React App/i);
  expect(linkElement).toBeInTheDocument();
});

test('PopulationGraphが表示されるか', () => {
  const mockData: PopulationResponse['result'] = {
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
  };

  render(<PopulationGraph populationData={mockData} />);

  // HighchartsReactが表示されているか
  const highchartsElement = screen.getByTestId('highcharts-container');
  expect(highchartsElement).toBeInTheDocument();
});
