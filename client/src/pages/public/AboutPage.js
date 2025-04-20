import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaHandsHelping, 
  FaUsers, 
  FaChartLine,
  FaLightbulb,
  FaComments,
  FaGraduationCap,
  FaAward,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock
} from 'react-icons/fa';

function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');

  const impactStats = [
    { icon: FaUsers, count: '1,000+', label: 'Community Members Served', color: 'blue' },
    { icon: FaHandsHelping, count: '150+', label: 'Active Volunteers', color: 'green' },
    { icon: FaGraduationCap, count: '50+', label: 'Training Programs', color: 'purple' },
    { icon: FaChartLine, count: '85%', label: 'Program Success Rate', color: 'indigo' }
  ];

  const coreValues = [
    {
      icon: FaHeart,
      title: 'Compassion',
      description: 'We approach every interaction with empathy and understanding.'
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We continuously evolve our methods to better serve our community.'
    },
    {
      icon: FaHandsHelping,
      title: 'Support',
      description: 'We provide comprehensive support systems for mental health needs.'
    },
    {
      icon: FaComments,
      title: 'Communication',
      description: 'We foster open dialogue and active listening.'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Mental Health Awareness Workshop',
      date: '2024-04-15',
      time: '2:00 PM - 4:00 PM',
      location: 'Community Center'
    },
    {
      title: 'Volunteer Training Session',
      date: '2024-04-20',
      time: '10:00 AM - 12:00 PM',
      location: 'NAMI Yolo Office'
    },
    {
      title: 'Family Support Group',
      date: '2024-04-25',
      time: '6:00 PM - 7:30 PM',
      location: 'Online (Zoom)'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Williams',
      role: 'Executive Director',
      image: 'https://source.unsplash.com/random/400x400?portrait=1',
      bio: 'Mental health advocate with 15+ years of experience in nonprofit leadership.'
    },
    {
      name: 'Michael Johnson',
      role: 'Program Director',
      image: 'https://source.unsplash.com/random/400x400?portrait=2',
      bio: 'Dedicated to developing impactful mental health programs and community initiatives.'
    },
    {
      name: 'Emily Chen',
      role: 'Volunteer Coordinator',
      image: 'https://source.unsplash.com/random/400x400?portrait=3',
      bio: 'Passionate about building strong volunteer communities and improving volunteer retention.'
    },
    {
      name: 'David Rodriguez',
      role: 'Community Outreach',
      image: 'https://source.unsplash.com/random/400x400?portrait=4',
      bio: 'Experienced in developing partnerships and expanding community reach.'
    }
  ];

  const achievements = [
    {
      year: '2023',
      title: 'Excellence in Community Service',
      description: 'Recognized for outstanding contribution to mental health support.'
    },
    {
      year: '2022',
      title: 'Innovation in Mental Health Programs',
      description: 'Awarded for developing innovative support methodologies.'
    },
    {
      year: '2021',
      title: 'Community Impact Award',
      description: 'Honored for significant positive impact on community mental health.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Making Mental Health Support
              <span className="block text-indigo-200">Accessible to All</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
              We're dedicated to providing comprehensive mental health support through community engagement, 
              volunteer programs, and innovative support systems.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                to="/volunteer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
              >
                Become a Volunteer
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
              >
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {impactStats.map((stat, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg bg-white p-6 shadow-md transition-transform hover:scale-105">
                <div className={`absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-${stat.color}-100 opacity-20`}></div>
                <stat.icon className={`h-8 w-8 text-${stat.color}-500 mb-4`} />
                <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
                <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['mission', 'values', 'team', 'achievements'].map((tab) => (
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
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {/* Mission & Vision */}
          {activeTab === 'mission' && (
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                <p className="mt-4 text-lg text-gray-500">
                  To empower individuals and families affected by mental health conditions through support, 
                  education, and advocacy, while building a compassionate and understanding community.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                <p className="mt-4 text-lg text-gray-500">
                  A world where mental health support is readily available, stigma-free, and integrated into 
                  every community, ensuring that no one faces mental health challenges alone.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Upcoming Events</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <div className="mt-2 space-y-1 text-sm text-gray-500">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-2" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Core Values */}
          {activeTab === 'values' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Core Values</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-100 opacity-20"></div>
                    <value.icon className="h-8 w-8 text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-500">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team */}
          {activeTab === 'team' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      className="h-48 w-full object-cover"
                      src={member.image}
                      alt={member.name}
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-blue-600 mb-2">{member.role}</p>
                      <p className="text-sm text-gray-500">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Achievements</h2>
              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <FaAward className="h-8 w-8 text-yellow-400" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-blue-600 font-semibold">{achievement.year}</p>
                        <h3 className="text-xl font-semibold text-gray-900 mt-1">{achievement.title}</h3>
                        <p className="mt-2 text-gray-500">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to make a difference?</span>
            <span className="block text-indigo-200">Join our community today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-100">
            Help us support mental health in our community. Your time and skills can change lives.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/volunteer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
            >
              Become a Volunteer
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-500"
            >
              Support Our Mission
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
