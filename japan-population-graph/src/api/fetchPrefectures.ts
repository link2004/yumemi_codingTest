const BASE_URL = 'https://opendata.resas-portal.go.jp';
const API_KEY = process.env.REACT_APP_RESAS_API_KEY;

if (API_KEY === undefined) {
  throw new Error('RESAS_API_KEYが設定されていません。');
}

export interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface PrefecturesResponse {
  statusCode: string;
  message: string;
  result: Prefecture[];
}

// 都道府県データを取得する関数
export const fetchPrefectures = async (): Promise<PrefecturesResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/prefectures`, {
      headers: {
        'X-API-KEY': API_KEY,
        // 'X-API-KEY': '',
      },
    });
    const data = (await response.json()) as PrefecturesResponse;
    // data.statusCode = '400';
    if (data.statusCode === '403') {
      throw new Error('APIキーが無効です。');
    } else if (data.statusCode >= '400') {
      throw new Error(`${data.statusCode}: ${data.message}`);
    }
    return data;
  } catch (error) {
    throw new Error(`データの取得に失敗しました。${String(error)}`);
  }
};

// 都道府県コードから都道府県の名前を取得する関数
export const getPrefectureName = (prefCode: number, prefectures: Prefecture[]): string => {
  const prefecture = prefectures.find((prefecture) => prefecture.prefCode === prefCode);
  if (prefecture === undefined) {
    throw new Error('都道府県が見つかりませんでした。');
  }
  return prefecture.prefName;
};
