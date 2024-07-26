import React from 'react';
import './SelectInput.css';

const SelectInput = ({ id, label, value, onChange, options }) => {
  return (
    <div className="select-input">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select id={id} value={value} onChange={onChange} className="select-field">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
