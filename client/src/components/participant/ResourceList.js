import React from 'react';
import { FaFileAlt, FaVideo, FaLink, FaFilePdf } from 'react-icons/fa';

function ResourceList({ resources }) {
  if (!resources || resources.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No resources available
      </div>
    );
  }

  // Helper function to get icon based on resource type
  const getResourceIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" />;
      case 'video':
        return <FaVideo className="text-purple-500" />;
      case 'article':
        return <FaFileAlt className="text-blue-500" />;
      default:
        return <FaLink className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-3">
      {resources.map((resource) => (
        <a 
          key={resource.id}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
            {getResourceIcon(resource.type)}
          </div>
          <div className="ml-4 flex-1">
            <div className="text-sm font-medium text-gray-900">{resource.title}</div>
            <div className="text-xs text-gray-500">{resource.category}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default ResourceList;
