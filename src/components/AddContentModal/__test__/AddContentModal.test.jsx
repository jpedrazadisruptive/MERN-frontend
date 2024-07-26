import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { vi, test } from 'vitest';
import AddContentModal from '../AddContentModal';

vi.mock('axios');

test('renders without crashing', () => {
  render(<AddContentModal isOpen={true} onClose={() => {}} onSubmit={() => {}} />);
});

test('displays categories', async () => {
  const categories = [
    { _id: '1', name: 'Category 1', allowsImages: true, allowsVideos: true, allowsTexts: true },
    { _id: '2', name: 'Category 2', allowsImages: true, allowsVideos: false, allowsTexts: true },
  ];

  axios.get.mockResolvedValue({ data: categories });

  render(<AddContentModal isOpen={true} onClose={() => {}} onSubmit={() => {}} />);

  await waitFor(() => expect(screen.getByText('Category 1')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('Category 2')).toBeInTheDocument());
});

test('calls onSubmit with the correct data', async () => {
  const onSubmit = vi.fn();
  const categories = [
    { _id: '1', name: 'Category 1', allowsImages: true, allowsVideos: true, allowsTexts: true },
  ];

  axios.get.mockResolvedValue({ data: categories });

  render(<AddContentModal isOpen={true} onClose={() => {}} onSubmit={onSubmit} />);

  fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Content' } });

  await waitFor(() => screen.getByLabelText(/Category/i));
  fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: '1' } });

  await waitFor(() => screen.getByLabelText(/Type/i));
  fireEvent.change(screen.getByLabelText(/Type/i), { target: { value: 'Image' } });

  await waitFor(() => screen.getByLabelText(/Image URL/i));
  fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'http://example.com/image.jpg' } });

  fireEvent.click(screen.getByRole('button', { name: /Add/i }));

  await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({
    title: 'New Content',
    type: 'Image',
    url: '',
    text: '',
    imageUrl: 'http://example.com/image.jpg',
    categoryId: '1',
  }));
});
