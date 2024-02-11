import React from 'react';
interface SelectBoxProps {
  selectedOption: string;
  Options: string[];
  handleOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SelectBox: React.FC<SelectBoxProps> = ({ selectedOption, Options, handleOptionChange }) => {
  return (
    <div className="select-container">
      <select value={selectedOption} onChange={handleOptionChange}>
        {Options.map((label: string, index: number) => (
          <option key={index} value={label}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
