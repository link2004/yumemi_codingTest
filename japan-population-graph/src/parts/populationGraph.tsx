import React, { useState } from 'react';
import { type PopulationResponse } from '../api/fetchPrefecturesPopulation';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface PopulationDisplayProps {
  populationData: PopulationResponse['result'];
}

const PopulationDisplay: React.FC<PopulationDisplayProps> = ({ populationData }) => {
  const [selectedOption, setSelectedOption] = useState<string>('総人口');
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        {populationData.data.map((item, index) => (
          <option key={index} value={item.label}>
            {item.label}
          </option>
        ))}
      </select>
      <HighchartsReact
        highcharts={Highcharts}
        containerProps={{ 'data-testid': 'highcharts-container' }}
        options={{
          title: {
            text: selectedOption,
          },
          xAxis: {
            title: {
              text: 'Year',
            },
          },
          yAxis: {
            title: {
              text: 'Population',
            },
          },
          series: populationData.data
            .filter((item) => item.label === selectedOption)
            .map((item) => ({
              name: item.label,
              data: item.data.map((yearData) => [yearData.year, yearData.value]),
            })),
        }}
      />
    </div>
  );
};

export default PopulationDisplay;
