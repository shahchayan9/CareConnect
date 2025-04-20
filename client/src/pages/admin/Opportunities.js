import React from 'react';
import AdminVisuals from '../../components/admin/Visualizations';

const Opportunities = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Opportunities Analytics</h1>
          <AdminVisuals />
        </div>
      </div>
    </div>
  );
};

export default Opportunities; 