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

interface PopulationResponse {
  message: null | string;
  result: {
    boundaryYear: number;
    data: PopulationDataSet[];
  };
}

// 都道府県の人口構成を取得する
export const fetchPrefectures = async (_prefCode: number): Promise<PopulationResponse> => {
  try {
    const response = await fetch(`${BASE_URL}api/v1/population/composition/perYear`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
      body: JSON.stringify({
        prefCode: _prefCode,
        cityCode: '-', // 都道府県の場合は'-'を指定
      }),
    });
    const data = (await response.json()) as PopulationResponse;
    return data;
  } catch (error) {
    throw new Error(`データの取得に失敗しました。${String(error)}`);
  }
};
