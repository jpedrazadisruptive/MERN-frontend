import React from 'react';

const SearchFilters = ({
  searchCategory,
  handleCategoryChange,
  searchContentName,
  handleContentNameChange,
  role,
  setIsModalOpen,
}) => (
  <div className="flex flex-col space-y-4 mb-4">
    <div className="flex justify-center">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search by category"
          value={searchCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Search by content name"
          value={searchContentName}
          onChange={handleContentNameChange}
          className="p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    {(role === 'Admin' || role === 'Creator') && (
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Content
        </button>
      </div>
    )}
  </div>
);

export default SearchFilters;
