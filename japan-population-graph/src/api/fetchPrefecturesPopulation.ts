const BASE_URL = 'https://opendata.resas-portal.go.jp';
const API_KEY = process.env.REACT_APP_RESAS_API_KEY;

if (API_KEY === undefined) {
  throw new Error('RESAS_API_KEYが設定されていません。');
}

interface PopulationDataPoint {
  year: number;
  value: number;
}

interface PopulationDataSet {
  label: string;
  data: PopulationDataPoint[];
}

export interface PopulationResponse {
  message: null | string;
  result: {
    boundaryYear: number;
    data: PopulationDataSet[];
  };
}

export interface PrefecturePopulation {
  prefCode: number;
  populationResponse: PopulationResponse;
}

// 都道府県の人口構成を取得する
export const fetchPrefecturePopulation = async (prefCode: number): Promise<PrefecturePopulation> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }

    const populationResponse = (await response.json()) as PopulationResponse;
    const data: PrefecturePopulation = {
      prefCode,
      populationResponse,
    };
    return data;
  } catch (error) {
    throw new Error(`データの取得に失敗しました。${String(error)}`);
  }
};
