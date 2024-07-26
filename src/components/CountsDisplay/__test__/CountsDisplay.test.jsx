import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import CountsDisplay from '../CountsDisplay';

test('renders counts correctly', () => {
  const counts = { Image: 5, Video: 3, Text: 10 };
  render(<CountsDisplay counts={counts} />);

  expect(screen.getByText('Images: 5')).toBeInTheDocument();
  expect(screen.getByText('Videos: 3')).toBeInTheDocument();
  expect(screen.getByText('Texts: 10')).toBeInTheDocument();
});

test('renders zero counts when counts are not provided', () => {
  const counts = {};
  render(<CountsDisplay counts={counts} />);

  expect(screen.getByText('Images: 0')).toBeInTheDocument();
  expect(screen.getByText('Videos: 0')).toBeInTheDocument();
  expect(screen.getByText('Texts: 0')).toBeInTheDocument();
});
