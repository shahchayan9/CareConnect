import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

// Mock data for development
const mockProfileData = {
  personalInfo: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Davis, CA 95616',
    dateJoined: '2024-01-15',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Spouse',
      phone: '(555) 987-6543'
    }
  },
  preferences: {
    communicationPreferences: {
      email: true,
      sms: true,
      phone: false
    },
    programInterests: [
      'Support Groups',
      'Educational Workshops',
      'Crisis Support',
      'Family Programs'
    ],
    availabilityPreferences: {
      weekdays: true,
      weekends: true,
      evenings: true,
      mornings: false
    }
  },
  supportHistory: {
    programsAttended: [
      {
        name: 'Family Support Group',
        date: '2024-03-10',
        status: 'completed'
      },
      {
        name: 'Mental Health Workshop',
        date: '2024-02-15',
        status: 'completed'
      },
      {
        name: 'Crisis Management Session',
        date: '2024-01-20',
        status: 'completed'
      }
    ],
    upcomingPrograms: [
      {
        name: 'Wellness Recovery Workshop',
        date: '2024-03-25',
        status: 'scheduled'
      }
    ]
  }
};

function ParticipantProfile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfileData(mockProfileData);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <FaUser className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-base text-gray-900">
                    {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base text-gray-900">{profileData.personalInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-base text-gray-900">{profileData.personalInfo.phone}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-base text-gray-900">{profileData.personalInfo.address}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="text-base text-gray-900">
                    {new Date(profileData.personalInfo.dateJoined).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Emergency Contact</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-base text-gray-900">{profileData.personalInfo.emergencyContact.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Relationship</p>
              <p className="text-base text-gray-900">{profileData.personalInfo.emergencyContact.relationship}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-base text-gray-900">{profileData.personalInfo.emergencyContact.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Communication Preferences</h3>
              <div className="space-y-2">
                {Object.entries(profileData.preferences.communicationPreferences).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      disabled={!isEditing}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Program Interests</h3>
              <div className="space-y-2">
                {profileData.preferences.programInterests.map((interest) => (
                  <div key={interest} className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {interest}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support History */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Support History</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Programs Attended</h3>
              <div className="space-y-3">
                {profileData.supportHistory.programsAttended.map((program) => (
                  <div key={program.name} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{program.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(program.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {program.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Upcoming Programs</h3>
              <div className="space-y-3">
                {profileData.supportHistory.upcomingPrograms.map((program) => (
                  <div key={program.name} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{program.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(program.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {program.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantProfile; 