import { render, screen } from '@testing-library/react';
import { fetchPrefectures } from './api/fetchPrefectures';
import { fetchPrefecturePopulation, type PopulationResponse } from './api/fetchPrefecturesPopulation';
import PopulationDisplay from './parts/populationGraph';

test('fetchPrefectures', async () => {
  await expect(fetchPrefectures()).resolves.toBeDefined();
});

test('fetchPrefecturePopulation', async () => {
  await expect(fetchPrefecturePopulation(1)).resolves.toBeDefined();
});

test('renders PopulationDisplay component with data', () => {
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
    ],
  };

  render(<PopulationDisplay populationData={mockData} />);

  expect(screen.getByText('Population Data')).toBeInTheDocument();
  expect(screen.getByText('Boundary Year: 2020')).toBeInTheDocument();
  expect(screen.getByText('総人口')).toBeInTheDocument();
  expect(screen.getByText('Year: 1980, Value: 12817')).toBeInTheDocument();
  expect(screen.getByText('Year: 1985, Value: 12707')).toBeInTheDocument();
  expect(screen.getByText('Year: 1990, Value: 12571')).toBeInTheDocument();
});
