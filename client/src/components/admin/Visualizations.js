import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
// import ReactTooltip from 'react-tooltip';
import { FaInfoCircle, FaUniversity, FaGraduationCap, FaUsers, FaMapMarkedAlt, FaCalendarAlt, FaBuilding, FaClock, FaChartLine } from 'react-icons/fa';
import axios from 'axios';
import { format, parseISO, getDay } from 'date-fns';
import Papa from 'papaparse';
import '../../styles/heatmap.css';
import WordCloud from 'react-d3-cloud';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    ArcElement
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    ChartTooltip,
    Legend,
    ArcElement
  );
  

const AdminVisuals = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [boroughs, setBoroughs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBorough, setSelectedBorough] = useState('All');

  useEffect(() => {
    fetch('/api/opportunities')
      .then(response => response.json())
      .then(data => {
        console.log('Received data:', data);
        setData(data);
  
        // Get unique categories and boroughs that have values
        const cSet = new Set(data.map(row => row.category_desc).filter(Boolean));
        const bSet = new Set(data.map(row => row.Borough).filter(Boolean));
  
        setCategories(['All', ...Array.from(cSet)]);
        setBoroughs(['All', ...Array.from(bSet)]);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  

  const filtered = data.filter(row => {
    return (selectedCategory === 'All' || row.category_desc === selectedCategory) &&
           (selectedBorough === 'All' || row.Borough === selectedBorough);
  });

  // Academic Year Activity Heatmap
  const heatmapData = filtered.reduce((acc, row) => {
    if (row.created_date) {
      const date = format(new Date(row.created_date), 'yyyy-MM-dd');
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const dates = Object.keys(heatmapData).map(date => new Date(date));  
  const minDate = dates.length > 0 ? new Date(Math.min(...dates)) : new Date();
  const maxDate = dates.length > 0 ? new Date(Math.max(...dates)) : new Date();
  console.log(minDate,maxDate);
  // Summary Statistics
  const summaryStats = {
    totalEvents: filtered.length,
    totalVolunteers: filtered.reduce((sum, row) => sum + (parseInt(row.vol_requests) || 0), 0),
    avgVolunteersPerEvent: filtered.length > 0 
      ? Math.round(filtered.reduce((sum, row) => sum + (parseInt(row.vol_requests) || 0), 0) / filtered.length)
      : 0,
    uniqueCategories: new Set(filtered.map(row => row.category_desc).filter(Boolean)).size
  };

  // Participation Trend by Category
  const categoryTrendData = {};
  filtered.forEach(row => {
    if (row.category_desc && row.created_date) {
      const month = format(new Date(row.created_date), 'yyyy-MM');
      if (!categoryTrendData[month]) {
        categoryTrendData[month] = {};
      }
      categoryTrendData[month][row.category_desc] = (categoryTrendData[month][row.category_desc] || 0) + 1;
    }
  });

  const categoryTrendLabels = Object.keys(categoryTrendData).sort();
  const uniqueCategories = [...new Set(filtered.map(row => row.category_desc).filter(Boolean))];
  
  const categoryTrendDatasets = uniqueCategories.map((category, index) => ({
    label: category,
    data: categoryTrendLabels.map(month => categoryTrendData[month][category] || 0),
    borderColor: `hsl(${(index * 360) / uniqueCategories.length}, 70%, 50%)`,
    backgroundColor: `hsla(${(index * 360) / uniqueCategories.length}, 70%, 50%, 0.1)`,
    fill: true
  }));

  const categoryTrendChartData = {
    labels: categoryTrendLabels,
    datasets: categoryTrendDatasets
  };

  // Category Distribution
  const categoryData = {
    labels: [...new Set(filtered.map(row => row.category_desc).filter(Boolean))],
    datasets: [
      {
        label: 'Events by Category',
        data: [...new Set(filtered.map(row => row.category_desc))].map(cat => {
          return filtered.filter(row => row.category_desc === cat).length;
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ]
      }
    ]
  };

  // Borough Distribution
  const boroughData = {
    labels: [...new Set(filtered.map(row => row.Borough).filter(Boolean))],
    datasets: [
      {
        label: 'Events by Borough',
        data: [...new Set(filtered.map(row => row.Borough))].map(borough => {
          return filtered.filter(row => row.Borough === borough).length;
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  // Event Type Distribution
  const eventTypeData = {
    labels: ['One-time', 'Ongoing'],
    datasets: [
      {
        data: [
          filtered.filter(row => row.recurrence_type === 'onetime').length,
          filtered.filter(row => row.recurrence_type === 'ongoing').length
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ]
      }
    ]
  };

  // Volunteer Demand Over Time
  const trendData = {};
  filtered.forEach(row => {
    if (row.created_date) {
      const month = format(new Date(row.created_date), 'yyyy-MM');
      trendData[month] = (trendData[month] || 0) + (parseInt(row.vol_requests) || 0);
    }
  });

  const demandData = {
    labels: Object.keys(trendData).sort(),
    datasets: [
      {
        label: 'Volunteer Demand Over Time',
        data: Object.keys(trendData).sort().map(key => trendData[key]),
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1
      }
    ]
  };

  // Day of Week Distribution
  const dayOfWeekData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    datasets: [
      {
        label: 'Events by Day of Week',
        data: [0, 1, 2, 3, 4, 5, 6].map(day => 
          filtered.filter(row => {
            if (!row.start_date_date) return 0;
            const eventDay = getDay(new Date(row.start_date_date));
            return eventDay === day;
          }).length
        ),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }
    ]
  };

  // Word Cloud Data
  const wordCloudData = filtered
    .map(row => row.title)
    .join(' ')
    .toLowerCase()
    .split(/\s+/)
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

  const words = Object.entries(wordCloudData)
    .map(([text, value]) => ({ text, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 50)
    .map(word => ({
      text: word.text,
      value: word.value * 10
    }));

  const fontSizeMapper = word => Math.log2(word.value) * 5;
  const rotate = word => word.value % 360;

  // Monthly Activity Data
  const monthlyActivityData = {
    labels: Object.keys(trendData).sort(),
    datasets: [
      {
        label: 'Monthly Activity',
        data: Object.keys(trendData).sort().map(key => trendData[key]),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const newEntries = results.data;
        // Append new data to existing dataset
        setData((prevData) => [...prevData, ...newEntries]);
      }
    });
  };
  
  
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Community Insights</h1>
              <p className="mt-1 text-xs text-gray-500">
                Analyze community engagement and event patterns across categories and boroughs
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Upload Dataset
                </label>
              </div>
              <div className="text-xs text-gray-500">
                <p>Supported format: CSV</p>
                <p>Max size: 10MB</p>
              </div>
            </div>
          </div>

          {/* File Upload Status */}
          {data.length > 0 && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm text-green-700">
                  Dataset loaded successfully! {data.length} records found.
                </span>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white shadow rounded-lg p-3 mb-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">
                  Event Category
                </label>
                <select
                  id="category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  value={selectedCategory}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                >
                  {categories.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="borough" className="block text-xs font-medium text-gray-700 mb-1">
                  Borough
                </label>
                <select
                  id="borough"
                  onChange={(e) => setSelectedBorough(e.target.value)}
                  value={selectedBorough}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                >
                  {boroughs.map((b, i) => (
                    <option key={i} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Heatmap - Full Width */}
            <div className="md:col-span-2 bg-white shadow rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">Volunteer Opportunity Activity Over Time</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <FaUsers className="mr-1" />
                  <span>Track volunteer opportunities throughout the year</span>
                </div>
              </div>
              <div className="overflow-x-auto max-h-[150px]">
                <CalendarHeatmap
                  startDate={minDate}
                  endDate={maxDate}
                  values={Object.entries(heatmapData).map(([date, count]) => ({                    
                    date,
                    count
                  }))}
                  classForValue={value => {
                    if (!value) return 'color-empty';
                    const count = value.count || 0;
                    return `color-github-${Math.min(4, Math.floor(count / 2))}`;
                  }}                  
                  showMonthLabels={true}
                  tooltipDataAttrs={value => {
                    if (!value || !value.date) return {};
                    return {
                      'data-tip': `${value.date}: ${value.count || 0} volunteer opportunities`
                    };
                  }}
                  style={{
                    height: '10px',
                    width: '50px'
                  }}                                
                  monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}                  
                  monthLabelStyle={{
                    fontSize: '1px',
                    fill: '#666'
                  }}
                />
                <div className="flex justify-end mt-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2">Activity Level:</span>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-100 mr-1"></div>
                      <span className="mr-2">None</span>
                      <div className="w-3 h-3 bg-green-100 mr-1"></div>
                      <span className="mr-2">Low</span>
                      <div className="w-3 h-3 bg-green-300 mr-1"></div>
                      <span className="mr-2">Medium</span>
                      <div className="w-3 h-3 bg-green-500 mr-1"></div>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            

            {/* Summary Statistics */}
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-indigo-50 rounded-lg p-3 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-indigo-600">Total Events</p>
                    <p className="text-lg font-bold text-gray-900">{summaryStats.totalEvents}</p>
                  </div>
                  <div className="bg-indigo-100 rounded-full p-2">
                    <FaCalendarAlt className="text-indigo-600 text-sm" />
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-green-600">Total Volunteers</p>
                    <p className="text-lg font-bold text-gray-900">{summaryStats.totalVolunteers}</p>
                  </div>
                  <div className="bg-green-100 rounded-full p-2">
                    <FaUsers className="text-green-600 text-sm" />
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-purple-600">Avg. Volunteers/Event</p>
                    <p className="text-lg font-bold text-gray-900">{summaryStats.avgVolunteersPerEvent}</p>
                  </div>
                  <div className="bg-purple-100 rounded-full p-2">
                    <FaGraduationCap className="text-purple-600 text-sm" />
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-blue-600">Unique Categories</p>
                    <p className="text-lg font-bold text-gray-900">{summaryStats.uniqueCategories}</p>
                  </div>
                  <div className="bg-blue-100 rounded-full p-2">
                    <FaInfoCircle className="text-blue-600 text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Category Participation Trends */}
            <div className="bg-white shadow rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">Category Participation Trends</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <FaChartLine className="mr-1" />
                  <span>Monthly participation by category</span>
                </div>
              </div>
              <div className="h-[200px]">
                <Line
                  data={categoryTrendChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                      mode: 'index',
                      intersect: false
                    },
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          font: {
                            size: 10
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        stacked: true,
                        ticks: {
                          font: {
                            size: 10
                          }
                        }
                      },
                      x: {
                        ticks: {
                          font: {
                            size: 10
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Volunteer Demand Over Time */}
            <div className="bg-white shadow rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">Volunteer Demand Over Time</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <FaUsers className="mr-1" />
                  <span>Track volunteer needs over time</span>
                </div>
              </div>
              <div className="h-[200px]">
                <Line
                  data={demandData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: {
                          font: {
                            size: 10
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          font: {
                            size: 10
                          }
                        }
                      },
                      x: {
                        ticks: {
                          font: {
                            size: 10
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Event Type Distribution */}
            <div className="bg-white shadow rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">Event Types</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <FaCalendarAlt className="mr-1" />
                  <span>One-time vs Ongoing events</span>
                </div>
              </div>
              <div className="h-[200px]">
                <Doughnut
                  data={eventTypeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          font: {
                            size: 10
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Borough Distribution */}
            <div className="bg-white shadow rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">Events by Borough</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <FaMapMarkedAlt className="mr-1" />
                  <span>Popular event locations</span>
                </div>
              </div>
              <div className="h-[200px]">
                <Bar
                  data={boroughData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        ticks: {
                          maxRotation: 45,
                          minRotation: 45,
                          font: {
                            size: 10
                          }
                        }
                      },
                      y: {
                        ticks: {
                          font: {
                            size: 10
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVisuals;
