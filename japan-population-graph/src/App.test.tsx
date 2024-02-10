import { render, screen } from '@testing-library/react';
import { fetchPrefectures, getPrefectureName } from './api/fetchPrefectures';
import { fetchPrefecturePopulation, type PrefecturePopulation } from './api/fetchPrefecturesPopulation';
import { fetchPrefecturePopulations } from './api/fetchPrefecturesPopulation';
import PrefectureCheckBoxList from './parts/prefectureCheckBoxList';
import PopulationGraph from './parts/populationGraph';
import App from './App';

// 都道府県を取得する関数（API）fetchPrefectures();
describe('fetchPrefectures', () => {
  test('success fetchPrefectures', async () => {
    const result = await fetchPrefectures();
    expect(result).toBeDefined();
    expect(result.result.length).toBe(47);
    expect(result.result[0]).toHaveProperty('prefCode');
    expect(result.result[0]).toHaveProperty('prefName');
  });
  test('error fetchPrefectures', async () => {
    // モックを使ってfetchPrefecturesのエラーをテストしたい（mockの実装につまずいているので後回し）
  });
});

// 都道府県コードから名前を取得する関数 getPrefectureName();
describe('getPrefectureName', () => {
  const prefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ];

  test('success getPrefectureName', () => {
    const result = getPrefectureName(1, prefectures);
    expect(result).toBe('北海道');
  });

  test('error getPrefectureName', () => {
    expect(() => getPrefectureName(99, prefectures)).toThrow('都道府県が見つかりませんでした。');
  });
});

// 都道府県の人口を取得する関数（API）fetchPrefecturePopulation();
describe('fetchPrefecturePopulation', () => {
  test('success fetchPrefecturePopulation', async () => {
    const result = await fetchPrefecturePopulation(1);
    expect(result).toBeDefined();
    expect(result.prefCode).toBe(1);
    expect(result.populationResponse).toBeDefined();
    expect(result.populationResponse.result).toHaveProperty('boundaryYear');
    expect(result.populationResponse.result).toHaveProperty('data');
  });
  test('error fetchPrefecturePopulation', async () => {});
});

// 複数の都道府県の人口を取得する関数 (API) fetchPrefecturePopulations();
describe('fetchPrefecturePopulations', () => {
  test('success fetchPrefecturePopulations', async () => {
    const result = await fetchPrefecturePopulations([1, 2]);
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result[0].prefCode).toBe(1);
    expect(result[1].prefCode).toBe(2);
    expect(result[0].populationResponse).toBeDefined();
    expect(result[1].populationResponse).toBeDefined();
  });
  test('error fetchPrefecturePopulations', async () => {});
});

// Appコンポーネントのテスト
test('render App', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

// PopulationGraphコンポーネントのテスト
describe('PopulationGraph', () => {
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

  // 毎回要素が変わるためsnapshotテストは省略
  // test('snapshot PopulationGraph', () => {
  //   const { asFragment } = render(
  //     <PopulationGraph prefecturePopulations={mockPopulations} prefectures={mockPrefectures} />,
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });

  test('render PopulationGraph', () => {
    render(<PopulationGraph prefecturePopulations={mockPopulations} prefectures={mockPrefectures} />);
    // HighchartsReactが表示されているか
    const highchartsElement = screen.getByTestId('highcharts-container');
    expect(highchartsElement).toBeInTheDocument();
    expect(highchartsElement).toHaveTextContent('北海道');
    expect(highchartsElement).toHaveTextContent('1980');
  });
});

// PrefectureCheckBoxListコンポーネントのテスト
describe('PrefectureCheckBoxList', () => {
  const mockPrefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ];
  const mockSelectedPrefectures = [{ prefCode: 1, prefName: '北海道' }];
  const mockSetSelectedPrefectures = jest.fn();
  test('snapshot prefectureCheckBoxList', () => {
    const { asFragment } = render(
      <PrefectureCheckBoxList
        prefectures={mockPrefectures}
        selectedPrefectures={mockSelectedPrefectures}
        setSelectedPrefectures={mockSetSelectedPrefectures}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('render prefectureCheckBoxList', () => {
    render(
      <PrefectureCheckBoxList
        prefectures={mockPrefectures}
        selectedPrefectures={mockSelectedPrefectures}
        setSelectedPrefectures={mockSetSelectedPrefectures}
      />,
    );

    // チェックボックスが表示されているか
    const checkboxElement = screen.getByRole('checkbox', { name: '北海道' });
    expect(checkboxElement).toBeInTheDocument();
  });
});
