const BASE_URL = 'https://opendata.resas-portal.go.jp';
const API_KEY = process.env.RESAS_API_KEY;
if (API_KEY === undefined) {
  throw new Error('RESAS_API_KEYが設定されていません。');
}

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface PrefecturesResponse {
  message: string;
  result: Prefecture[];
}

// 都道府県データを取得する関数
export const fetchPrefectures = async (): Promise<PrefecturesResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/prefectures`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });
    const data = (await response.json()) as PrefecturesResponse;
    return data;
  } catch (error) {
    throw new Error(`データの取得に失敗しました。${String(error)}`);
  }
};
