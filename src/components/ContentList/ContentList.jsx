import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ContentList.css';

const ContentList = ({ contents, onEdit, onDelete, userId, role }) => {
  const getYouTubeEmbedUrl = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return `https://www.youtube.com/embed/${urlParams.get('v')}`;
  };

  return (
    <div className="content-list space-y-4">
      {contents.map((content) => (
        <div key={content._id} className="content-item border p-4 mb-4 rounded shadow-md mx-auto max-w-xl relative">
          <div className="category-badge absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold p-1 rounded-bl">
            {content.category.name}
          </div>
          <h3 className="text-lg font-bold mb-2">{content.title}</h3>
          {userId === content.creator._id && (
            <button onClick={() => onEdit(content)} className="text-blue-500 hover:text-blue-700 mr-2" aria-label="Edit">
              <FaEdit />
            </button>
          )}
          {role === 'Admin' && (
            <button onClick={() => onDelete(content._id)} className="text-red-500 hover:text-red-700" aria-label="Delete">
              <FaTrash />
            </button>
          )}
          <div className="content-media mb-2">
            {content.type === 'Image' && content.imageUrl && (
              <img src={content.imageUrl} alt={content.title} className="media-item" />
            )}
            {content.type === 'Video' && content.url && (
              <iframe
                src={getYouTubeEmbedUrl(content.url)}
                title={content.title}
                className="media-item"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            {content.type === 'Text' && content.text && (
              <p>{content.text}</p>
            )}
          </div>
          <div>
            <span className="font-semibold">By:</span> {content.creator.username}
          </div>
          <div>
            <span className="font-semibold"></span> {formatDistanceToNow(new Date(content.createdAt))} ago
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
