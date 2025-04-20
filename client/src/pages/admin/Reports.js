import React, { useState, useEffect } from 'react';
import { FaChartBar, FaChartLine, FaChartPie, FaDownload, FaCalendarAlt } from 'react-icons/fa';
import api from '../../services/api';

// Mock data for development
const mockReportData = {
  volunteer: {
    totalHours: 1234,
    activeVolunteers: 123,
    eventsCompleted: 45,
    metrics: [
      { month: 'Jan', hours: 150 },
      { month: 'Feb', hours: 220 },
      { month: 'Mar', hours: 180 },
      { month: 'Apr', hours: 240 },
      { month: 'May', hours: 300 },
      { month: 'Jun', hours: 280 }
    ]
  },
  training: {
    totalHours: 856,
    activeVolunteers: 98,
    eventsCompleted: 32,
    metrics: [
      { month: 'Jan', completionRate: 75 },
      { month: 'Feb', completionRate: 82 },
      { month: 'Mar', completionRate: 78 },
      { month: 'Apr', completionRate: 85 },
      { month: 'May', completionRate: 90 },
      { month: 'Jun', completionRate: 88 }
    ]
  },
  impact: {
    totalHours: 2345,
    activeVolunteers: 145,
    eventsCompleted: 67,
    metrics: [
      { month: 'Jan', participants: 120 },
      { month: 'Feb', participants: 150 },
      { month: 'Mar', participants: 140 },
      { month: 'Apr', participants: 180 },
      { month: 'May', participants: 200 },
      { month: 'Jun', participants: 190 }
    ]
  }
};

function Reports() {
  const [reportData, setReportData] = useState(null);
  const [selectedReport, setSelectedReport] = useState('volunteer');
  const [dateRange, setDateRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setReportData(mockReportData[selectedReport]);
        setError(null);
      } catch (err) {
        console.error('Error fetching report data:', err);
        setError('Failed to load report data');
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [selectedReport, dateRange]);

  const reportTypes = [
    { id: 'volunteer', name: 'Volunteer Activity', icon: FaChartBar },
    { id: 'training', name: 'Training Completion', icon: FaChartLine },
    { id: 'impact', name: 'Community Impact', icon: FaChartPie }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Reports & Analytics
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaDownload className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Export Data
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`relative rounded-lg px-4 py-6 flex items-center space-x-3 hover:border-gray-400 focus:outline-none ${
                  selectedReport === type.id 
                    ? 'bg-blue-50 border-2 border-blue-500' 
                    : 'border-2 border-gray-200'
                }`}
              >
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                  selectedReport === type.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <type.icon className={`h-6 w-6 ${
                    selectedReport === type.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-medium ${
                    selectedReport === type.id ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {type.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Date Range Selection */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-4">
            <FaCalendarAlt className="h-5 w-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {/* Chart Visualization */}
          <div className="h-[400px] bg-gray-100 rounded-lg flex flex-col items-center justify-center">
            <div className="text-center text-gray-500">
              <FaChartBar className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Chart visualization would be rendered here</p>
              <p className="text-sm mb-4">Using a charting library like Recharts or Chart.js</p>
              
              {/* Display mock chart data */}
              <div className="w-full max-w-md bg-white rounded-lg shadow p-4 mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-4">
                  {selectedReport === 'volunteer' ? 'Monthly Volunteer Hours' :
                   selectedReport === 'training' ? 'Training Completion Rates' :
                   'Monthly Participant Count'}
                </h4>
                <div className="space-y-2">
                  {reportData?.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50">
                      <span className="text-sm text-gray-600">{metric.month}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {metric.hours ? `${metric.hours} hours` :
                         metric.completionRate ? `${metric.completionRate}%` :
                         `${metric.participants} participants`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 px-4 py-5 rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Hours</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{reportData?.totalHours}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Active Volunteers</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{reportData?.activeVolunteers}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Events Completed</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{reportData?.eventsCompleted}</dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports; 