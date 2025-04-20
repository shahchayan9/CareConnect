import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCheckCircle, 
  FaRegCircle, 
  FaClock, 
  FaCalendarAlt, 
  FaExclamationCircle 
} from 'react-icons/fa';
import api from '../../services/api';

function TrainingProgress() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        const response = await api.get('/volunteer/trainings');
        setTrainings(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching training data:', err);
        setError('Failed to load training data');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center p-10">Loading training data...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        {error}
      </div>
    );
  }

  // Sample data for development/demo
  const sampleTrainings = [
    {
      id: 1,
      title: 'Peer-to-Peer Basics',
      status: 'completed',
      completionDate: '2025-03-15',
      category: 'Core',
      durationHours: 8
    },
    {
      id: 2,
      title: 'Crisis Intervention',
      status: 'in-progress',
      progress: 60,
      nextSession: '2025-04-25',
      category: 'Advanced',
      durationHours: 12
    },
    {
      id: 3,
      title: 'Family-to-Family Program',
      status: 'not-started',
      availableDate: '2025-05-10',
      category: 'Specialized',
      durationHours: 16
    },
    {
      id: 4,
      title: 'Community Outreach Skills',
      status: 'waitlisted',
      category: 'Advanced',
      durationHours: 6
    }
  ];

  const data = trainings.length > 0 ? trainings : sampleTrainings;

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Training Pathway</h3>
          <div className="text-sm text-gray-600">
            <span className="font-medium">2</span> of <span className="font-medium">4</span> completed
          </div>
        </div>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
          
          {/* Training Items */}
          <div className="space-y-8 relative z-10">
            {data.map((training, index) => (
              <div key={training.id} className="flex">
                {/* Status Icon */}
                <div className="flex-shrink-0">
                  {training.status === 'completed' ? (
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <FaCheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  ) : training.status === 'in-progress' ? (
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaClock className="h-6 w-6 text-blue-600" />
                    </div>
                  ) : training.status === 'waitlisted' ? (
                    <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <FaExclamationCircle className="h-6 w-6 text-yellow-600" />
                    </div>
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <FaRegCircle className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Training Details */}
                <div className="ml-4 flex-1">
                  <div className="flex flex-wrap justify-between items-start">
                    <div>
                      <h4 className="text-md font-medium text-gray-900">{training.title}</h4>
                      <p className="text-sm text-gray-500">{training.category} • {training.durationHours} hours</p>
                    </div>
                    
                    <div className="text-sm">
                      {training.status === 'completed' && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          Completed
                        </span>
                      )}
                      {training.status === 'in-progress' && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          In Progress
                        </span>
                      )}
                      {training.status === 'not-started' && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                          Not Started
                        </span>
                      )}
                      {training.status === 'waitlisted' && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                          Waitlisted
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Additional Status Details */}
                  <div className="mt-2">
                    {training.status === 'completed' && (
                      <div className="text-sm text-gray-600">
                        Completed on {new Date(training.completionDate).toLocaleDateString()}
                      </div>
                    )}
                    
                    {training.status === 'in-progress' && (
                      <div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-2">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${training.progress}%` }}></div>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <FaCalendarAlt className="mr-1 text-gray-400" />
                          Next session: {new Date(training.nextSession).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                    
                    {training.status === 'not-started' && (
                      <div className="text-sm text-gray-600 flex items-center">
                        <FaCalendarAlt className="mr-1 text-gray-400" />
                        Available from: {new Date(training.availableDate).toLocaleDateString()}
                      </div>
                    )}
                    
                    {training.status === 'waitlisted' && (
                      <div className="text-sm text-gray-600 flex items-center">
                        <FaExclamationCircle className="mr-1 text-yellow-500" />
                        You'll be notified when spots open up
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-3">
                    {training.status === 'completed' && (
                      <Link 
                        to={`/volunteer/trainings/${training.id}/certificate`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View Certificate
                      </Link>
                    )}
                    
                    {training.status === 'in-progress' && (
                      <Link 
                        to={`/volunteer/trainings/${training.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Continue Training
                      </Link>
                    )}
                    
                    {training.status === 'not-started' && (
                      <Link 
                        to={`/volunteer/trainings/${training.id}`}
                        className="text-sm font-medium text-green-600 hover:text-green-800"
                      >
                        Start Training
                      </Link>
                    )}
                    
                    {training.status === 'waitlisted' && (
                      <div className="flex space-x-4">
                        <button 
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          View Similar Trainings
                        </button>
                        <button 
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Leave Waitlist
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <Link 
          to="/volunteer/trainings"
          className="inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          View All Trainings
        </Link>
      </div>
    </div>
  );
}

export default TrainingProgress;
