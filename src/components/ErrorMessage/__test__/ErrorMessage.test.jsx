import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import ErrorMessage from '../ErrorMessage';

test('renders the error message', () => {
  const message = 'This is an error message';
  render(<ErrorMessage message={message} />);

  expect(screen.getByText(message)).toBeInTheDocument();
});
