import React from 'react';
import './PasswordInput.css';

const PasswordInput = ({ id, label, value, onChange, placeholder = '', required = false }) => {
  return (
    <div className="password-input">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="password"
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

export default PasswordInput;
