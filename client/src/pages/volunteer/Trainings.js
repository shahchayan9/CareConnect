import React, { useState, useEffect } from 'react';
import { 
  FaGraduationCap, FaCalendarAlt, FaClock, FaMapMarkerAlt,
  FaCheckCircle, FaHourglassHalf, FaLock, FaPlay
} from 'react-icons/fa';
import api from '../../services/api';

// Mock data for development
const mockTrainingsData = {
  inProgress: [
    {
      id: 1,
      title: 'Crisis Intervention Advanced',
      type: 'Required',
      progress: 60,
      dueDate: '2024-04-15',
      totalHours: 12,
      completedHours: 7,
      nextSession: {
        date: '2024-03-20',
        time: '2:00 PM - 4:00 PM',
        location: 'Main Office'
      }
    },
    {
      id: 2,
      title: 'Peer Support Refresher',
      type: 'Optional',
      progress: 30,
      dueDate: '2024-04-30',
      totalHours: 8,
      completedHours: 2.5,
      nextSession: {
        date: '2024-03-22',
        time: '10:00 AM - 12:00 PM',
        location: 'Online'
      }
    }
  ],
  completed: [
    {
      id: 3,
      title: 'Mental Health First Aid',
      type: 'Required',
      completionDate: '2024-02-15',
      hours: 8,
      certificate: 'MHFA-2024-123',
      validUntil: '2025-02-15'
    },
    {
      id: 4,
      title: 'Suicide Prevention Basics',
      type: 'Required',
      completionDate: '2024-01-20',
      hours: 6,
      certificate: 'SPB-2024-456',
      validUntil: '2025-01-20'
    },
    {
      id: 5,
      title: 'Cultural Competency',
      type: 'Optional',
      completionDate: '2023-12-10',
      hours: 4,
      certificate: 'CC-2023-789',
      validUntil: '2024-12-10'
    }
  ],
  available: [
    {
      id: 6,
      title: 'Family Support Specialist',
      type: 'Optional',
      startDate: '2024-04-01',
      duration: '4 weeks',
      hours: 16,
      prerequisites: ['Mental Health First Aid', 'Peer Support Basics'],
      spots: 5
    },
    {
      id: 7,
      title: 'Group Facilitation Skills',
      type: 'Optional',
      startDate: '2024-04-15',
      duration: '2 weeks',
      hours: 8,
      prerequisites: [],
      spots: 10
    }
  ]
};

function Trainings() {
  const [trainingsData, setTrainingsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('inProgress');

  useEffect(() => {
    const fetchTrainingsData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTrainingsData(mockTrainingsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching trainings data:', err);
        setError('Failed to load trainings data');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingsData();
  }, []);

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
            My Trainings
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {['inProgress', 'completed', 'available'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
            </button>
          ))}
        </nav>
      </div>

      {/* In Progress Trainings */}
      {activeTab === 'inProgress' && (
        <div className="space-y-6">
          {trainingsData.inProgress.map((training) => (
            <div key={training.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{training.title}</h3>
                    <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      training.type === 'Required' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {training.type}
                    </span>
                  </div>
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    <FaPlay className="h-4 w-4 mr-2" />
                    Continue
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{training.progress}% Complete</span>
                    <span className="text-sm text-gray-500">
                      {training.completedHours} of {training.totalHours} hours
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${training.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Next session */}
                <div className="mt-4 bg-gray-50 rounded-md p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Next Session</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(training.nextSession.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="h-4 w-4 mr-2 text-gray-400" />
                      {training.nextSession.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaMapMarkerAlt className="h-4 w-4 mr-2 text-gray-400" />
                      {training.nextSession.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Trainings */}
      {activeTab === 'completed' && (
        <div className="space-y-6">
          {trainingsData.completed.map((training) => (
            <div key={training.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{training.title}</h3>
                    <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      training.type === 'Required' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {training.type}
                    </span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <FaCheckCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Completion Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(training.completionDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Hours Completed</dt>
                    <dd className="mt-1 text-sm text-gray-900">{training.hours}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Certificate Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">{training.certificate}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Valid Until</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(training.validUntil).toLocaleDateString()}
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Available Trainings */}
      {activeTab === 'available' && (
        <div className="space-y-6">
          {trainingsData.available.map((training) => (
            <div key={training.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{training.title}</h3>
                    <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      training.type === 'Required' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {training.type}
                    </span>
                  </div>
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Enroll Now
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(training.startDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Duration</dt>
                    <dd className="mt-1 text-sm text-gray-900">{training.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Total Hours</dt>
                    <dd className="mt-1 text-sm text-gray-900">{training.hours}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Available Spots</dt>
                    <dd className="mt-1 text-sm text-gray-900">{training.spots}</dd>
                  </div>
                </div>

                {training.prerequisites.length > 0 && (
                  <div className="mt-4 bg-gray-50 rounded-md p-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <FaLock className="h-4 w-4 mr-2" />
                      Prerequisites
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {training.prerequisites.map((prereq, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Trainings; 