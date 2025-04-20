import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaExclamationTriangle, FaBook, FaVideo, FaComments, FaCalendarAlt } from 'react-icons/fa';
import SupportChatbot from '../../components/participant/SupportChatbot';
import ResourceList from '../../components/participant/ResourceList';

// Mock data for development
const mockSupportData = {
  emergencyContacts: [
    {
      id: 1,
      name: 'Crisis Hotline',
      phone: '1-800-273-8255',
      available: '24/7',
      description: 'Immediate support for mental health crises'
    },
    {
      id: 2,
      name: 'NAMI Yolo Support Line',
      phone: '(555) 123-4567',
      available: 'Mon-Fri, 9am-5pm',
      description: 'Local support and resources'
    }
  ],
  resources: [
    {
      id: 1,
      title: 'Coping Strategies Guide',
      type: 'pdf',
      category: 'Self-Help',
      url: '#',
      lastAccessed: '2024-03-19'
    },
    {
      id: 2,
      title: 'Mindfulness Meditation Series',
      type: 'video',
      category: 'Wellness',
      url: '#',
      lastAccessed: '2024-03-17'
    },
    {
      id: 3,
      title: 'Understanding Mental Health',
      type: 'article',
      category: 'Education',
      url: '#',
      lastAccessed: '2024-03-15'
    },
    {
      id: 4,
      title: 'Local Support Services Directory',
      type: 'pdf',
      category: 'Resources',
      url: '#',
      lastAccessed: '2024-03-14'
    }
  ],
  supportTeam: [
    {
      id: 1,
      name: 'Dr. Sarah Thompson',
      role: 'Clinical Director',
      availability: 'Mon, Wed, Fri',
      email: 'sarah.t@example.com'
    },
    {
      id: 2,
      name: 'Mark Wilson',
      role: 'Support Coordinator',
      availability: 'Tue, Thu',
      email: 'mark.w@example.com'
    }
  ]
};

function ParticipantSupport() {
  const [supportData, setSupportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSupportData(mockSupportData);
        setError(null);
      } catch (err) {
        console.error('Error fetching support data:', err);
        setError('Failed to load support data');
      } finally {
        setLoading(false);
      }
    };

    fetchSupportData();
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
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Support Resources</h1>

      {/* Emergency Contacts */}
      <div className="bg-red-50 rounded-lg shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-red-100">
          <div className="flex items-center">
            <FaExclamationTriangle className="h-5 w-5 text-red-600 mr-2" />
            <h2 className="text-lg font-semibold text-red-900">Emergency Contacts</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {supportData.emergencyContacts.map((contact) => (
              <div key={contact.id} className="border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-red-900">{contact.name}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <FaPhone className="h-5 w-5 text-red-500 mr-2" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  <p className="text-sm text-red-700">Available: {contact.available}</p>
                  <p className="text-sm text-red-600">{contact.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Support Team */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Support Team</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {supportData.supportTeam.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                        Available: {member.availability}
                      </div>
                      <div className="flex items-center text-sm">
                        <FaEnvelope className="h-4 w-4 text-gray-400 mr-2" />
                        <a
                          href={`mailto:${member.email}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {member.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Resources</h2>
            </div>
            <div className="p-6">
              <ResourceList resources={supportData.resources} />
            </div>
          </div>
        </div>

        {/* Chat Support */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Chat Support</h2>
          </div>
          <div className="p-6">
            {showChatbot ? (
              <SupportChatbot />
            ) : (
              <div className="text-center">
                <FaComments className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Need help?</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start a conversation with our support team
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowChatbot(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <a
          href="#resources"
          className="bg-purple-50 p-6 rounded-lg shadow-sm hover:bg-purple-100 transition-colors"
        >
          <FaBook className="h-8 w-8 text-purple-600" />
          <h3 className="mt-4 text-lg font-medium text-purple-900">Resource Library</h3>
          <p className="mt-2 text-sm text-purple-600">
            Access our collection of self-help guides and educational materials
          </p>
        </a>
        
        <a
          href="#workshops"
          className="bg-green-50 p-6 rounded-lg shadow-sm hover:bg-green-100 transition-colors"
        >
          <FaVideo className="h-8 w-8 text-green-600" />
          <h3 className="mt-4 text-lg font-medium text-green-900">Online Workshops</h3>
          <p className="mt-2 text-sm text-green-600">
            Join our interactive online workshops and support groups
          </p>
        </a>
        
        <a
          href="#support"
          className="bg-blue-50 p-6 rounded-lg shadow-sm hover:bg-blue-100 transition-colors"
        >
          <FaComments className="h-8 w-8 text-blue-600" />
          <h3 className="mt-4 text-lg font-medium text-blue-900">Support Groups</h3>
          <p className="mt-2 text-sm text-blue-600">
            Connect with others in our supportive community
          </p>
        </a>
      </div>
    </div>
  );
}

export default ParticipantSupport; 