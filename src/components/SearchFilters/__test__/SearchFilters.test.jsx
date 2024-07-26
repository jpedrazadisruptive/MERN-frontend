import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import SearchFilters from '../SearchFilters';

test('renders search inputs and handles changes', () => {
  const handleCategoryChange = vi.fn();
  const handleContentNameChange = vi.fn();
  
  const { getByPlaceholderText } = render(
    <SearchFilters
      searchCategory=""
      handleCategoryChange={handleCategoryChange}
      searchContentName=""
      handleContentNameChange={handleContentNameChange}
      role="User"
      setIsModalOpen={() => {}}
    />
  );

  const categoryInput = getByPlaceholderText('Search by category');
  const contentNameInput = getByPlaceholderText('Search by content name');

  fireEvent.change(categoryInput, { target: { value: 'New Category' } });
  fireEvent.change(contentNameInput, { target: { value: 'New Content Name' } });

  expect(handleCategoryChange).toHaveBeenCalledTimes(1);
  expect(handleContentNameChange).toHaveBeenCalledTimes(1);
});

test('renders Add Content button for Admin and Creator roles', () => {
  const setIsModalOpen = vi.fn();

  const { getByText, rerender, queryByText } = render(
    <SearchFilters
      searchCategory=""
      handleCategoryChange={() => {}}
      searchContentName=""
      handleContentNameChange={() => {}}
      role="Admin"
      setIsModalOpen={setIsModalOpen}
    />
  );

  expect(getByText('Add Content')).toBeInTheDocument();

  rerender(
    <SearchFilters
      searchCategory=""
      handleCategoryChange={() => {}}
      searchContentName=""
      handleContentNameChange={() => {}}
      role="Creator"
      setIsModalOpen={setIsModalOpen}
    />
  );

  expect(getByText('Add Content')).toBeInTheDocument();

  rerender(
    <SearchFilters
      searchCategory=""
      handleCategoryChange={() => {}}
      searchContentName=""
      handleContentNameChange={() => {}}
      role="User"
      setIsModalOpen={setIsModalOpen}
    />
  );

  expect(queryByText('Add Content')).not.toBeInTheDocument();
});

test('calls setIsModalOpen when Add Content button is clicked', () => {
  const setIsModalOpen = vi.fn();

  const { getByText } = render(
    <SearchFilters
      searchCategory=""
      handleCategoryChange={() => {}}
      searchContentName=""
      handleContentNameChange={() => {}}
      role="Admin"
      setIsModalOpen={setIsModalOpen}
    />
  );

  fireEvent.click(getByText('Add Content'));
  expect(setIsModalOpen).toHaveBeenCalledTimes(1);
});
