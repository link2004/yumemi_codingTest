import './populationGraph.css';
import React, { useState } from 'react';
import { type PrefecturePopulation } from '../api/fetchPrefecturesPopulation';
import { getPrefectureName, type Prefecture } from '../api/fetchPrefectures';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface PopulationDisplayProps {
  prefecturePopulations: PrefecturePopulation[];
  prefectures: Prefecture[];
}

const PopulationDisplay: React.FC<PopulationDisplayProps> = ({ prefecturePopulations, prefectures }) => {
  const [selectedOption, setSelectedOption] = useState<string>('総人口');
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOption(event.target.value);
  };
  const populationOptions = prefecturePopulations[0].populationResponse.result.data.map((item, index) => item.label);
  return (
    <div className="graph-container">
      <div className="graph-content">
        <div className="select-container">
          <select value={selectedOption} onChange={handleOptionChange}>
            {populationOptions.map((label, index) => (
              <option key={index} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          containerProps={{ 'data-testid': 'highcharts-container' }}
          options={{
            title: {
              text: '',
            },
            xAxis: {
              title: {
                text: '西暦',
              },
            },
            yAxis: {
              title: {
                text: '人口',
              },
            },
            series: prefecturePopulations.map((prefecturePopulation) => {
              const data = prefecturePopulation.populationResponse.result.data.find(
                (item) => item.label === selectedOption,
              );
              if (data === undefined) {
                throw new Error('data is undefined');
              }
              const prefectureName = getPrefectureName(prefecturePopulation.prefCode, prefectures);
              return {
                name: prefectureName,
                data: data.data.map((item) => [item.year, item.value]),
              };
            }),
          }}
        />
      </div>
    </div>
  );
};

export default PopulationDisplay;
