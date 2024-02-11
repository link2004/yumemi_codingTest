import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { fetchPrefectures, getPrefectureName, type Prefecture } from './api/fetchPrefectures';
import { fetchPrefecturePopulation, type PrefecturePopulation } from './api/fetchPrefecturesPopulation';
import { fetchPrefecturePopulations } from './api/fetchPrefecturesPopulation';
import PrefectureCheckBoxList from './parts/prefectureCheckBoxList';
import PopulationGraph from './parts/populationGraph';
import App from './App';

// モックの設定
const mockPrefectures = {
  message: null,
  result: new Array(47).fill(0).map((_, index) => ({ prefCode: index, prefName: '北海道' })),
};
const mockAPIError = {
  statusCode: '403',
  message: 'Forbidden.',
};
const mock400Error = {
  statusCode: '400',
  message: 'error message',
};
const mockPopulation = {
  statusCode: '',
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
};

// 都道府県を取得する関数（API）fetchPrefectures();
describe('API:fetchPrefectures', () => {
  test('success', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(
      Promise.resolve({
        json: async () => await Promise.resolve(mockPrefectures),
      }),
    );
    const result = await fetchPrefectures();
    expect(result).toBeDefined();
    expect(result.result.length).toBe(47);
    expect(result.result[0]).toHaveProperty('prefCode');
    expect(result.result[0]).toHaveProperty('prefName');
  });

  test('API error', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(
      Promise.resolve({
        json: async () => await Promise.resolve(mockAPIError),
      }),
    );
    await expect(fetchPrefectures()).rejects.toThrow('都道府県データの取得に失敗しました。Error: APIキーが無効です。');
  });

  test('400 error', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(
      Promise.resolve({
        json: async () => await Promise.resolve(mock400Error),
      }),
    );
    await expect(fetchPrefectures()).rejects.toThrow('都道府県データの取得に失敗しました。Error: 400: error message');
  });
});

// 都道府県コードから名前を取得する関数 getPrefectureName();
describe('getPrefectureName', () => {
  const prefectures: Prefecture[] = mockPrefectures.result as Prefecture[];

  test('success', () => {
    const result = getPrefectureName(1, prefectures);
    expect(result).toBe('北海道');
  });

  test('notfound error', () => {
    expect(() => getPrefectureName(99, prefectures)).toThrow('都道府県が見つかりませんでした。');
  });
});

// 都道府県の人口を取得する関数（API）fetchPrefecturePopulation();
describe('API:fetchPrefecturePopulation', () => {
  test('success', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(
      Promise.resolve({
        json: async () => await Promise.resolve(mockPopulation),
      }),
    );
    const result = await fetchPrefecturePopulation(1); // PrefCde:1で北海道を指定
    expect(result).toBeDefined();
    expect(result.prefCode).toBe(1); // 北海道のprefcodeが返ってきているか
    expect(result.populationResponse).toBeDefined();
    expect(result.populationResponse.result).toHaveProperty('boundaryYear');
    expect(result.populationResponse.result).toHaveProperty('data');
    expect(result.populationResponse.result.data[0].label).toBe('総人口');
    expect(result.populationResponse.result.data[0].data).toBeDefined();
  });
  test('API error', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(
      Promise.resolve({
        json: async () => await Promise.resolve(mockAPIError),
      }),
    );
    await expect(fetchPrefecturePopulation(1)).rejects.toThrow(
      '人口構成データの取得に失敗しました。Error: APIキーが無効です。',
    );
  });
  test('400 error', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(
      Promise.resolve({
        json: async () => await Promise.resolve(mock400Error),
      }),
    );
    await expect(fetchPrefecturePopulation(1)).rejects.toThrow(
      '人口構成データの取得に失敗しました。Error: 400: error message',
    );
  });
});

// 複数の都道府県の人口を取得する関数 (API) fetchPrefecturePopulations();
describe('API:fetchPrefecturePopulations', () => {
  test('success', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({
        json: async () => await Promise.resolve(mockPopulation),
      }),
    );
    const result = await fetchPrefecturePopulations([1, 2]); // 北海道と青森県のprefCodeを指定
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result[0].prefCode).toBe(1);
    expect(result[1].prefCode).toBe(2);
    expect(result[0].populationResponse).toBeDefined();
    expect(result[1].populationResponse).toBeDefined();
  });
  test('API error', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({
        json: async () => await Promise.resolve(mockAPIError),
      }),
    );
    await expect(fetchPrefecturePopulations([1, 2])).rejects.toThrow(
      '人口構成データの取得に失敗しました。Error: APIキーが無効です。',
    );
  });
  test('400 error', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({
        json: async () => await Promise.resolve(mock400Error),
      }),
    );
    await expect(fetchPrefecturePopulations([1, 2])).rejects.toThrow(
      '人口構成データの取得に失敗しました。Error: 400: error message',
    );
  });
});

// Appコンポーネントのテスト
describe('App', () => {
  test('render: App', () => {
    render(<App />);
    const headerElement = screen.getByRole('heading', { name: '都道府県別の総人口推移グラフ' });
    expect(headerElement).toBeInTheDocument();
  });
  test('snapshot App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
  describe('prefecture', () => {
    test('render: loading', () => {
      global.fetch = jest.fn().mockResolvedValueOnce(
        Promise.resolve({
          json: async () => await Promise.resolve(mockPrefectures),
        }),
      );
      render(<App />);
      const loadingElement = screen.getByTestId('prefecture-loading');
      expect(loadingElement).toBeInTheDocument();
    });
    test('render: prefecture', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce(
        Promise.resolve({
          json: async () => await Promise.resolve(mockPrefectures),
        }),
      );
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('prefecture-loading'));
      const prefectureElement = screen.getByTestId('prefecture-list');
      expect(prefectureElement).toBeInTheDocument();
      expect(prefectureElement).toHaveTextContent('北海道');
      expect(screen.getAllByRole('checkbox').length).toBe(47);
    });
    test('render: API error', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce(
        Promise.resolve({
          json: async () => await Promise.resolve(mockAPIError),
        }),
      );
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('prefecture-loading'));
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('都道府県データの取得に失敗しました。Error: APIキーが無効です。');
    });
    test('render: 400 error', async () => {
      global.fetch = jest.fn().mockResolvedValueOnce(
        Promise.resolve({
          json: async () => await Promise.resolve(mock400Error),
        }),
      );
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('prefecture-loading'));
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('都道府県データの取得に失敗しました。Error: 400: error message');
    });
    test('render: Network error', async () => {
      global.fetch = jest.fn().mockImplementation(async () => await Promise.reject(new TypeError('Failed to fetch')));
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('prefecture-loading'));
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('都道府県データの取得に失敗しました。TypeError: Failed to fetch');
    });
  });
  describe('population-graph', () => {
    test('render: loading', () => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce(
          Promise.resolve({
            json: async () => await Promise.resolve(mockPrefectures),
          }),
        )
        .mockResolvedValueOnce(
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                json: async () => await Promise.resolve(mockPopulation),
              });
            }, 100);
          }),
        );
      render(<App />);
      const loadingElement = screen.getByTestId('population-loading');
      expect(loadingElement).toBeInTheDocument();
    });
    test('render: population-graph', async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce(
          Promise.resolve({
            json: async () => await Promise.resolve(mockPrefectures),
          }),
        )
        .mockResolvedValueOnce(
          Promise.resolve({
            json: async () => await Promise.resolve(mockPopulation),
          }),
        );
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('population-loading'));
      const graphElement = screen.getByTestId('population-graph');
      expect(graphElement).toBeInTheDocument();
      expect(graphElement).toHaveTextContent('北海道');
      expect(graphElement).toHaveTextContent('1980');
    });
    test('render: API error', async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce(
          Promise.resolve({
            json: async () => await Promise.resolve(mockPrefectures),
          }),
        )
        .mockResolvedValueOnce(
          Promise.resolve({
            json: async () => await Promise.resolve(mockAPIError),
          }),
        );
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('population-loading'));
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('人口構成データの取得に失敗しました。Error: APIキーが無効です。');
    });
    test('render: 400 error', async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce(
          Promise.resolve({
            json: async () => await Promise.resolve(mockPrefectures),
          }),
        )
        .mockResolvedValueOnce(
          Promise.resolve({
            json: async () => await Promise.resolve(mock400Error),
          }),
        );
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('population-loading'));
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('人口構成データの取得に失敗しました。Error: 400: error message');
    });
    test('render: Network error', async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce(
          Promise.resolve({
            json: async () => await Promise.resolve(mockPrefectures),
          }),
        )
        .mockImplementationOnce(async () => await Promise.reject(new TypeError('Failed to fetch')));
      render(<App />);
      await waitForElementToBeRemoved(() => screen.getByTestId('population-loading'));
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement).toHaveTextContent('Error: 人口構成データの取得に失敗しました。TypeError: Failed to fetch');
    });
  });
});

// PopulationGraphコンポーネントのテスト
describe('PopulationGraph', () => {
  const _mockPopulations: PrefecturePopulation[] = [{ prefCode: 1, populationResponse: mockPopulation }];
  const _mockPrefectures: Prefecture[] = mockPrefectures.result as Prefecture[];

  test('render: PopulationGraph', () => {
    const populationGraph = render(
      <PopulationGraph prefecturePopulations={_mockPopulations} prefectures={_mockPrefectures} />,
    );
    // HighchartsReactが表示されているか
    expect(populationGraph.container.querySelector('.highcharts-root')).toBeInTheDocument();
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
  test('render: PrefectureCheckBoxList', () => {
    render(
      <PrefectureCheckBoxList
        prefectures={mockPrefectures}
        selectedPrefectures={mockSelectedPrefectures}
        setSelectedPrefectures={mockSetSelectedPrefectures}
      />,
    );
    expect(screen.getAllByRole('checkbox').length).toBe(2);
    const checkboxElement = screen.getByRole('checkbox', { name: '北海道' });
    expect(checkboxElement).toBeInTheDocument();
    const checkboxElement2 = screen.getByRole('checkbox', { name: '青森県' });
    expect(checkboxElement2).toBeInTheDocument();
  });
});
