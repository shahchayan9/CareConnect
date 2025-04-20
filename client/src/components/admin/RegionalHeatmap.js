import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import api from '../../services/api';

function RegionalHeatmap() {
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('volunteers'); // 'volunteers' or 'needs'

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/analytics/regional-data');
        setMapData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching regional data:', err);
        setError('Failed to load regional data');
      } finally {
        setLoading(false);
      }
    };

    fetchMapData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center p-10">Loading map data...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        {error}
      </div>
    );
  }

  // This would be replaced with actual data from the API in production
  const sampleData = [
    { name: 'Davis', volunteers: 45, needs: 30, engagement: 0.8 },
    { name: 'Woodland', volunteers: 32, needs: 40, engagement: 0.6 },
    { name: 'West Sacramento', volunteers: 28, needs: 35, engagement: 0.7 },
    { name: 'Winters', volunteers: 15, needs: 25, engagement: 0.5 },
    { name: 'Other Areas', volunteers: 20, needs: 30, engagement: 0.4 },
  ];

  const data = mapData.length > 0 ? mapData : sampleData;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('volunteers')}
            className={`px-3 py-1 text-xs rounded-full ${
              viewMode === 'volunteers' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Volunteers
          </button>
          <button
            onClick={() => setViewMode('needs')}
            className={`px-3 py-1 text-xs rounded-full ${
              viewMode === 'needs' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Community Needs
          </button>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="volunteers" barSize={20} fill="#3b82f6" />
            <Bar dataKey="needs" barSize={20} fill="#ef4444" />
            <Area type="monotone" dataKey="engagement" fill="#10b981" stroke="#10b981" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium">Key Insights:</h4>
        <ul className="mt-2 text-xs text-gray-600 space-y-1">
          <li>• Woodland has the highest need-to-volunteer gap</li>
          <li>• Davis has the most active volunteers</li>
          <li>• Winters needs more volunteer recruitment</li>
        </ul>
      </div>
    </div>
  );
}

export default RegionalHeatmap;
