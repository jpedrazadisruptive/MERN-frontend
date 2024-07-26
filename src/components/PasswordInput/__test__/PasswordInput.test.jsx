import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import PasswordInput from '../PasswordInput';

test('renders PasswordInput with label and input field', () => {
  const { getByLabelText } = render(
    <PasswordInput 
      id="password" 
      label="Password" 
      value="" 
      onChange={() => {}} 
    />
  );

  expect(getByLabelText('Password')).toBeInTheDocument();
});

test('calls onChange when input value changes', () => {
  const handleChange = vi.fn();
  const { getByLabelText } = render(
    <PasswordInput 
      id="password" 
      label="Password" 
      value="" 
      onChange={handleChange} 
    />
  );

  fireEvent.change(getByLabelText('Password'), { target: { value: 'new password' } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});

test('renders PasswordInput with placeholder', () => {
  const { getByPlaceholderText } = render(
    <PasswordInput 
      id="password" 
      label="Password" 
      value="" 
      onChange={() => {}} 
      placeholder="Enter your password" 
    />
  );

  expect(getByPlaceholderText('Enter your password')).toBeInTheDocument();
});

test('renders PasswordInput as required', () => {
  const { getByLabelText } = render(
    <PasswordInput 
      id="password" 
      label="Password" 
      value="" 
      onChange={() => {}} 
      required 
    />
  );

  expect(getByLabelText('Password')).toBeRequired();
});
