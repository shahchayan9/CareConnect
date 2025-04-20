import React, { useState, useEffect } from 'react';
import { FaStar, FaCalendarAlt } from 'react-icons/fa';

// Mock data for development
const mockFeedbackData = {
  pendingFeedback: [
    {
      id: 1,
      eventName: 'Wellness Workshop',
      date: '2024-03-15',
      type: 'Workshop',
      facilitator: 'Dr. Emily Chen'
    },
    {
      id: 2,
      eventName: 'Support Group Session',
      date: '2024-03-10',
      type: 'Support Group',
      facilitator: 'Mark Wilson'
    }
  ],
  submittedFeedback: [
    {
      id: 3,
      eventName: 'Stress Management Workshop',
      date: '2024-02-28',
      type: 'Workshop',
      rating: 5,
      comment: 'Very informative session with practical techniques.',
      facilitator: 'Sarah Thompson'
    },
    {
      id: 4,
      eventName: 'Family Support Group',
      date: '2024-02-20',
      type: 'Support Group',
      rating: 4,
      comment: 'Great discussion and supportive environment.',
      facilitator: 'John Davis'
    }
  ]
};

function ParticipantFeedback() {
  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentFeedback, setCurrentFeedback] = useState({
    rating: 0,
    comment: ''
  });

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFeedbackData(mockFeedbackData);
        setError(null);
      } catch (err) {
        console.error('Error fetching feedback data:', err);
        setError('Failed to load feedback data');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, []);

  const handleProvideFeedback = (event) => {
    setSelectedEvent(event);
    setCurrentFeedback({ rating: 0, comment: '' });
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setFeedbackData(prevData => ({
        pendingFeedback: prevData.pendingFeedback.filter(
          event => event.id !== selectedEvent.id
        ),
        submittedFeedback: [
          {
            ...selectedEvent,
            rating: currentFeedback.rating,
            comment: currentFeedback.comment
          },
          ...prevData.submittedFeedback
        ]
      }));
      
      setShowFeedbackModal(false);
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Feedback</h1>

      {/* Pending Feedback */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Pending Feedback</h2>
        </div>
        <div className="p-6">
          {feedbackData.pendingFeedback.length === 0 ? (
            <p className="text-gray-500 text-center">No pending feedback requests</p>
          ) : (
            <div className="space-y-4">
              {feedbackData.pendingFeedback.map((event) => (
                <div key={event.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{event.eventName}</h3>
                    <div className="mt-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {event.date}
                      </div>
                      <div className="mt-1">Facilitator: {event.facilitator}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleProvideFeedback(event)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Provide Feedback
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submitted Feedback */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Submitted Feedback</h2>
        </div>
        <div className="p-6">
          {feedbackData.submittedFeedback.length === 0 ? (
            <p className="text-gray-500 text-center">No feedback submitted yet</p>
          ) : (
            <div className="space-y-6">
              {feedbackData.submittedFeedback.map((feedback) => (
                <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{feedback.eventName}</h3>
                      <div className="mt-1 text-xs text-gray-500">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          {feedback.date}
                        </div>
                        <div className="mt-1">Facilitator: {feedback.facilitator}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={index < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{feedback.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedEvent && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Provide Feedback for {selectedEvent.eventName}
                </h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setCurrentFeedback(prev => ({ ...prev, rating }))}
                        className="focus:outline-none"
                      >
                        <FaStar
                          className={`h-6 w-6 ${
                            rating <= currentFeedback.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments
                  </label>
                  <textarea
                    value={currentFeedback.comment}
                    onChange={(e) => setCurrentFeedback(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Share your thoughts about the event..."
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSubmitFeedback}
                  disabled={!currentFeedback.rating}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-300"
                >
                  Submit Feedback
                </button>
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParticipantFeedback; 