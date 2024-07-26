import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import TextInput from '../TextInput';

test('renders text input and handles change', () => {
  const handleChange = vi.fn((e) => e.target.value);

  const { getByLabelText } = render(
    <TextInput
      id="test-text-input"
      label="Test Text Input"
      value=""
      onChange={(e) => handleChange(e)}
      placeholder="Enter text"
    />
  );

  const textInput = getByLabelText('Test Text Input');

  fireEvent.change(textInput, { target: { value: 'New value' } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange.mock.results[0].value).toBe('New value');
});

test('renders text input with correct type and placeholder', () => {
  const handleChange = vi.fn();
  const { getByLabelText } = render(
    <TextInput
      id="test-password-input"
      label="Password"
      value=""
      onChange={handleChange}
      type="password"
      placeholder="Enter password"
    />
  );

  const textInput = getByLabelText('Password');

  expect(textInput).toBeInTheDocument();
  expect(textInput.type).toBe('password');
  expect(textInput.placeholder).toBe('Enter password');
});
