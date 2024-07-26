import React from 'react';
import './TextInput.css';

const TextInput = ({ id, label, value, onChange, type = 'text', placeholder = '', required = false }) => {
  return (
    <div className="text-input">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-field"
      />
    </div>
  );
};

export default TextInput;
