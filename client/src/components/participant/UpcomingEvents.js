import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa';

function UpcomingEvents({ events }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No upcoming events found. Check back soon!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <div key={event.id} className="border border-gray-200 rounded-lg p-5 hover:bg-gray-50">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              event.category === 'Support Group' ? 'bg-blue-100 text-blue-800' : 
              event.category === 'Workshop' ? 'bg-purple-100 text-purple-800' : 
              event.category === 'Presentation' ? 'bg-green-100 text-green-800' : 
              'bg-gray-100 text-gray-800'
            }`}>
              {event.category}
            </span>
          </div>
          
          <p className="mt-2 text-sm text-gray-600">{event.description}</p>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <FaCalendarAlt className="mr-2 text-gray-400" />
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short', 
                day: 'numeric'
              })}
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <FaClock className="mr-2 text-gray-400" />
              {event.startTime} - {event.endTime}
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <FaMapMarkerAlt className="mr-2 text-gray-400" />
              {event.location}
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <FaUserFriends className="mr-2 text-gray-400" />
              {event.attendeeCount} attending
            </div>
          </div>
          
          <div className="mt-5 flex justify-between">
            <Link 
              to={`/participant/events/${event.id}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View Details
            </Link>
            
            {event.registered ? (
              <span className="text-sm font-medium text-green-600">
                You're Registered ✓
              </span>
            ) : (
              <button 
                className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UpcomingEvents;
