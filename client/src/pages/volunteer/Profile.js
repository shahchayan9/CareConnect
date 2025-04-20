import React, { useState, useEffect } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, 
  FaCalendarAlt, FaGraduationCap, FaEdit, FaCheckCircle 
} from 'react-icons/fa';
import api from '../../services/api';

// Mock data for development
const mockProfileData = {
  personal: {
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.w@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Davis, CA 95616',
    bio: 'Passionate about mental health advocacy and community support. I have been volunteering for over 2 years and love making a difference in people\'s lives.',
    profileImage: null // In a real app, this would be an image URL
  },
  stats: {
    joinedDate: '2022-03-15',
    hoursLogged: 156,
    eventsAttended: 45,
    trainingsCompleted: 8
  },
  availability: {
    monday: ['morning', 'evening'],
    tuesday: ['afternoon'],
    wednesday: ['morning'],
    thursday: ['evening'],
    friday: ['afternoon'],
    saturday: ['morning'],
    sunday: []
  },
  certifications: [
    {
      name: 'Crisis Intervention Training',
      issueDate: '2023-06-15',
      expiryDate: '2024-06-15',
      status: 'active'
    },
    {
      name: 'Peer Support Specialist',
      issueDate: '2023-02-10',
      expiryDate: '2024-02-10',
      status: 'active'
    },
    {
      name: 'Mental Health First Aid',
      issueDate: '2022-08-20',
      expiryDate: '2023-08-20',
      status: 'expired'
    }
  ],
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    eventReminders: true,
    monthlyNewsletter: true,
    availabilityVisible: true
  }
};

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
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

  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('saved');
      setEditMode(false);
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      console.error('Error saving profile:', err);
      setSaveStatus('error');
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
            My Profile
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {saveStatus === 'saving' ? 'Saving...' : 
                 saveStatus === 'saved' ? 'Saved!' : 
                 saveStatus === 'error' ? 'Error!' : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaEdit className="-ml-1 mr-2 h-5 w-5" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-medium uppercase">
                  {profileData.personal.firstName.charAt(0)}
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-medium text-gray-900">
                  {profileData.personal.firstName} {profileData.personal.lastName}
                </h3>
                <div className="mt-1 text-sm text-gray-500">
                  Volunteer since {new Date(profileData.stats.joinedDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-900">{profileData.personal.email}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-900">{profileData.personal.phone}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-900">{profileData.personal.address}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <p className="text-gray-900">{profileData.personal.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Volunteer Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-semibold text-blue-600">
                  {profileData.stats.hoursLogged}
                </div>
                <div className="text-sm text-gray-500">Hours Logged</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-semibold text-green-600">
                  {profileData.stats.eventsAttended}
                </div>
                <div className="text-sm text-gray-500">Events Attended</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-semibold text-purple-600">
                  {profileData.stats.trainingsCompleted}
                </div>
                <div className="text-sm text-gray-500">Trainings Completed</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl font-semibold text-orange-600">
                  {Object.values(profileData.availability).flat().length}
                </div>
                <div className="text-sm text-gray-500">Available Slots/Week</div>
              </div>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Availability</h3>
            <div className="space-y-3">
              {Object.entries(profileData.availability).map(([day, slots]) => (
                <div key={day} className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-500">
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </div>
                  <div className="flex-1">
                    {slots.length > 0 ? (
                      <div className="flex space-x-2">
                        {slots.map((slot) => (
                          <span
                            key={slot}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {slot.charAt(0).toUpperCase() + slot.slice(1)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not available</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Certifications</h3>
            <div className="space-y-4">
              {profileData.certifications.map((cert, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{cert.name}</h4>
                      <div className="mt-1 text-xs text-gray-500">
                        <div className="flex items-center">
                          <FaCalendarAlt className="h-3 w-3 mr-1" />
                          Issued: {new Date(cert.issueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center mt-1">
                          <FaClock className="h-3 w-3 mr-1" />
                          Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      cert.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white shadow rounded-lg col-span-2">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {Object.entries(profileData.preferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    {key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}
                  </label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => {}}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 