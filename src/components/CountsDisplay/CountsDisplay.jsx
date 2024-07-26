import React from 'react';

const CountsDisplay = ({ counts }) => (
  <div className="flex flex-wrap justify-center md:justify-end space-x-4">
    <div className="p-2 bg-blue-100 text-blue-800 rounded">
      <p className="font-semibold">Images: {counts.Image || 0}</p>
    </div>
    <div className="p-2 bg-green-100 text-green-800 rounded">
      <p className="font-semibold">Videos: {counts.Video || 0}</p>
    </div>
    <div className="p-2 bg-yellow-100 text-yellow-800 rounded">
      <p className="font-semibold">Texts: {counts.Text || 0}</p>
    </div>
  </div>
);

export default CountsDisplay;