import React, { useState, useEffect } from 'react';
import { FaStar, FaThumbsUp, FaComment, FaPaperPlane } from 'react-icons/fa';
import api from '../../services/api';

// Mock data for development
const mockFeedbackData = {
  received: [
    {
      id: 1,
      eventTitle: 'Crisis Support Hotline',
      date: '2024-03-10',
      rating: 5,
      comment: 'Excellent work handling difficult calls. Your empathy and professionalism were outstanding.',
      from: 'Sarah Johnson',
      role: 'Program Coordinator'
    },
    {
      id: 2,
      eventTitle: 'Family Support Group',
      date: '2024-03-05',
      rating: 4,
      comment: 'Great facilitation skills. Consider incorporating more group activities next time.',
      from: 'Michael Chen',
      role: 'Lead Facilitator'
    }
  ],
  given: [
    {
      id: 3,
      eventTitle: 'Youth Mental Health Workshop',
      date: '2024-03-15',
      rating: 5,
      comment: 'The workshop was well-organized and the materials were very helpful. Looking forward to the next session.',
      to: 'Program Team'
    },
    {
      id: 4,
      eventTitle: 'Peer Support Training',
      date: '2024-03-01',
      rating: 4,
      comment: 'Training content was comprehensive. Would appreciate more role-playing exercises.',
      to: 'Training Department'
    }
  ],
  pending: [
    {
      id: 5,
      eventTitle: 'Community Outreach Event',
      date: '2024-03-18',
      eventId: 123,
      type: 'Event Feedback'
    },
    {
      id: 6,
      eventTitle: 'Crisis Intervention Training',
      date: '2024-03-20',
      eventId: 124,
      type: 'Training Feedback'
    }
  ]
};

function Feedback() {
  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('received');
  const [newFeedback, setNewFeedback] = useState({
    eventId: '',
    rating: 0,
    comment: ''
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
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

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setFeedbackData(prev => ({
        ...prev,
        pending: prev.pending.filter(event => event.id !== selectedEvent.id),
        given: [...prev.given, {
          id: Date.now(),
          eventTitle: selectedEvent.eventTitle,
          date: new Date().toISOString().split('T')[0],
          ...newFeedback
        }]
      }));
      
      // Reset form
      setNewFeedback({ eventId: '', rating: 0, comment: '' });
      setShowFeedbackForm(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      // Handle error
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
    <div className="px-6 py-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Feedback
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {['received', 'given', 'pending'].map((tab) => (
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
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'pending' && feedbackData.pending.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                  {feedbackData.pending.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Feedback Lists */}
      <div className="space-y-6">
        {activeTab === 'received' && feedbackData.received.map((feedback) => (
          <div key={feedback.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{feedback.eventTitle}</h3>
                  <p className="text-sm text-gray-500">
                    From: {feedback.from} ({feedback.role})
                  </p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`h-5 w-5 ${
                        index < feedback.rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">{feedback.comment}</div>
              <div className="mt-4 text-xs text-gray-500">
                Received on {new Date(feedback.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'given' && feedbackData.given.map((feedback) => (
          <div key={feedback.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{feedback.eventTitle}</h3>
                  <p className="text-sm text-gray-500">To: {feedback.to}</p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`h-5 w-5 ${
                        index < feedback.rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">{feedback.comment}</div>
              <div className="mt-4 text-xs text-gray-500">
                Submitted on {new Date(feedback.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'pending' && (
          <div className="space-y-4">
            {feedbackData.pending.map((event) => (
              <div key={event.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{event.eventTitle}</h3>
                      <p className="text-sm text-gray-500">{event.type}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Event Date: {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowFeedbackForm(true);
                      }}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <FaComment className="mr-2" />
                      Provide Feedback
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Form Modal */}
      {showFeedbackForm && selectedEvent && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmitFeedback}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Provide Feedback
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {selectedEvent.eventTitle} - {new Date(selectedEvent.date).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Rating
                        </label>
                        <div className="mt-1 flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                              className="focus:outline-none"
                            >
                              <FaStar
                                className={`h-8 w-8 ${
                                  star <= newFeedback.rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-200'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                          Comments
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="comment"
                            rows={4}
                            value={newFeedback.comment}
                            onChange={(e) =>
                              setNewFeedback({ ...newFeedback, comment: e.target.value })
                            }
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Share your experience..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <FaPaperPlane className="mr-2" />
                    Submit Feedback
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowFeedbackForm(false);
                      setSelectedEvent(null);
                      setNewFeedback({ eventId: '', rating: 0, comment: '' });
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feedback; 