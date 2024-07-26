import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import SelectInput from '../SelectInput';

test('renders select input and handles change', () => {
  const handleChange = vi.fn();
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  const { getByLabelText } = render(
    <SelectInput
      id="test-select"
      label="Test Select"
      value=""
      onChange={handleChange}
      options={options}
    />
  );

  const selectInput = getByLabelText('Test Select');

  fireEvent.change(selectInput, { target: { value: 'option1' } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(selectInput.value).toBe('option1');
});

test('renders options correctly', () => {
  const handleChange = vi.fn();
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  const { getByLabelText, getByText } = render(
    <SelectInput
      id="test-select"
      label="Test Select"
      value=""
      onChange={handleChange}
      options={options}
    />
  );

  const selectInput = getByLabelText('Test Select');

  expect(selectInput).toBeInTheDocument();
  expect(getByText('Option 1')).toBeInTheDocument();
  expect(getByText('Option 2')).toBeInTheDocument();
});
