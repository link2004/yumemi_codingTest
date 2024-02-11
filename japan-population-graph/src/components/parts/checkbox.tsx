import React, { type ChangeEvent } from 'react';
import './checkbox.css';

interface CheckboxProps {
  key: number;
  label: string;
  value: number;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ key, label, value, handleCheckboxChange }) => {
  return (
    <div key={key} className="prefectureItem">
      <label>
        <input type="checkbox" onChange={handleCheckboxChange} value={value} />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
