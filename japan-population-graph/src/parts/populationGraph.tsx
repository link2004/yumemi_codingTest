import React from 'react';
import { type PopulationResponse } from '../api/fetchPrefecturesPopulation';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface PopulationDisplayProps {
  populationData: PopulationResponse['result'];
}

const PopulationDisplay: React.FC<PopulationDisplayProps> = ({ populationData }) => {
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: 'Population Data',
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
          series: populationData.data.map((item) => ({
            name: item.label,
            data: item.data.map((yearData) => [yearData.year, yearData.value]),
          })),
        }}
      />
    </div>
  );
};

export default PopulationDisplay;
