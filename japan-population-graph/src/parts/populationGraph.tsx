import React from 'react';
import { type PopulationResponse } from '../api/fetchPrefecturesPopulation';

interface PopulationDisplayProps {
  populationData: PopulationResponse;
}

const PopulationDisplay: React.FC<PopulationDisplayProps> = ({ populationData }) => {
  const result = populationData.result;
  return (
    <div>
      <h2>Population Data</h2>
      <p>Boundary Year: {result.boundaryYear}</p>
      {result.data.map((item, index) => (
        <div key={index}>
          <h3>{item.label}</h3>
          {item.data.map((yearData, i) => (
            <p key={i}>
              Year: {yearData.year}, Value: {yearData.value}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PopulationDisplay;
