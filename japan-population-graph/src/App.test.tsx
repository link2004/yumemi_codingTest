/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';
import { fetchPrefectures } from './api/resas_api';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('fetchPrefectures', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('returns prefectures data when fetch is successful', async () => {
    const mockData = {
      message: null,
      result: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
        // ...other prefectures
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchPrefectures();
    expect(result).toEqual(mockData);
    expect(fetchMock.mock.calls.length).toEqual(1);
  });

  it('throws an error when fetch fails', async () => {
    fetchMock.mockReject(new Error('API error'));

    await expect(fetchPrefectures()).rejects.toThrow('API error');
    expect(fetchMock.mock.calls.length).toEqual(1);
  });
});
