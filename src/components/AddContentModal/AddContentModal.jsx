import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddContentModal = ({ isOpen, onClose, onSubmit, contentToEdit }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Image');
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [allowedTypes, setAllowedTypes] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (contentToEdit) {
      setTitle(contentToEdit.title);
      setType(contentToEdit.type);
      setUrl(contentToEdit.url || '');
      setText(contentToEdit.text || '');
      setImageUrl(contentToEdit.imageUrl || '');
      setCategoryId(contentToEdit.category._id);
    } else {
      setTitle('');
      setType('Image');
      setUrl('');
      setText('');
      setImageUrl('');
      setCategoryId('');
    }
  }, [contentToEdit]);

  useEffect(() => {
    const selectedCategory = categories.find(cat => cat._id === categoryId);
    if (selectedCategory) {
      const types = [];
      if (selectedCategory.allowsImages) types.push('Image');
      if (selectedCategory.allowsVideos) types.push('Video');
      if (selectedCategory.allowsTexts) types.push('Text');
      setAllowedTypes(types);
      if (!types.includes(type)) setType(types[0]);
    }
  }, [categoryId, categories, type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, type, url, text, imageUrl, categoryId });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">{contentToEdit ? 'Edit Content' : 'Add Content'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block">Category</label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block">Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              {allowedTypes.map((allowedType) => (
                <option key={allowedType} value={allowedType}>
                  {allowedType}
                </option>
              ))}
            </select>
          </div>
          {type === 'Video' && (
            <div>
              <label htmlFor="url" className="block">Video URL</label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2 border rounded"
                required={type === 'Video'}
              />
            </div>
          )}
          {type === 'Text' && (
            <div>
              <label htmlFor="text" className="block">Text</label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 border rounded"
                required={type === 'Text'}
              ></textarea>
            </div>
          )}
          {type === 'Image' && (
            <div>
              <label htmlFor="imageUrl" className="block">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2 border rounded"
                required={type === 'Image'}
              />
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {contentToEdit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContentModal;
