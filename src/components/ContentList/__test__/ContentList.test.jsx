import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import ContentList from '../ContentList';

const contents = [
  {
    _id: '1',
    title: 'Test Image',
    type: 'Image',
    imageUrl: 'http://example.com/image.jpg',
    url: '',
    text: '',
    category: { name: 'Category 1' },
    creator: { _id: 'user1', username: 'User 1' },
    createdAt: '2023-07-25T20:22:34.303Z',
  },
  {
    _id: '2',
    title: 'Test Video',
    type: 'Video',
    imageUrl: '',
    url: 'http://youtube.com/watch?v=abc123',
    text: '',
    category: { name: 'Category 2' },
    creator: { _id: 'user2', username: 'User 2' },
    createdAt: '2023-07-24T20:22:34.303Z',
  },
  {
    _id: '3',
    title: 'Test Text',
    type: 'Text',
    imageUrl: '',
    url: '',
    text: 'Sample text content',
    category: { name: 'Category 3' },
    creator: { _id: 'user1', username: 'User 1' },
    createdAt: '2023-07-23T20:22:34.303Z',
  },
];

test('renders content items', () => {
  render(<ContentList contents={contents} onEdit={() => {}} onDelete={() => {}} userId="user1" role="Admin" />);
  
  expect(screen.getByText('Test Image')).toBeInTheDocument();
  expect(screen.getByText('Test Video')).toBeInTheDocument();
  expect(screen.getByText('Test Text')).toBeInTheDocument();
});

test('displays edit button for own content', () => {
  render(<ContentList contents={contents} onEdit={() => {}} onDelete={() => {}} userId="user1" role="User" />);

  expect(screen.getAllByLabelText('Edit')).toHaveLength(2);
});

test('does not display edit button for other users content', () => {
  render(<ContentList contents={contents} onEdit={() => {}} onDelete={() => {}} userId="user3" role="User" />);

  expect(screen.queryByLabelText('Edit')).not.toBeInTheDocument();
});

test('displays delete button for admin role', () => {
  render(<ContentList contents={contents} onEdit={() => {}} onDelete={() => {}} userId="user1" role="Admin" />);

  expect(screen.getAllByLabelText('Delete')).toHaveLength(3);
});

test('calls onEdit when edit button is clicked', () => {
  const onEdit = vi.fn();
  render(<ContentList contents={contents} onEdit={onEdit} onDelete={() => {}} userId="user1" role="Admin" />);
  
  fireEvent.click(screen.getAllByLabelText('Edit')[0]);
  expect(onEdit).toHaveBeenCalledWith(contents[0]);
});

test('calls onDelete when delete button is clicked', () => {
  const onDelete = vi.fn();
  render(<ContentList contents={contents} onEdit={() => {}} onDelete={onDelete} userId="user1" role="Admin" />);
  
  fireEvent.click(screen.getAllByLabelText('Delete')[0]);
  expect(onDelete).toHaveBeenCalledWith('1');
});
