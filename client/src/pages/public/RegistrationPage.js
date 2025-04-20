import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import api from '../../services/api';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

function RegistrationPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: user?.given_name || '',
    lastName: user?.family_name || '',
    email: user?.email || '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    role: 'participant', // or volunteer
    preferences: {
      communicationPreferences: {
        email: true,
        phone: false,
        sms: false
      },
      programInterests: [],
      availabilityPreferences: {
        weekdays: false,
        weekends: false,
        mornings: false,
        afternoons: false,
        evenings: false
      }
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    // Additional fields for volunteers
    volunteerInfo: {
      skills: [],
      experience: '',
      languages: [],
      backgroundCheck: false,
      references: [{
        name: '',
        relationship: '',
        phone: '',
        email: ''
      }]
    }
  });

  const programOptions = [
    'Support Groups',
    'Educational Workshops',
    'Crisis Support',
    'Community Outreach',
    'Advocacy Programs',
    'Youth Programs',
    'Family Support'
  ];

  const skillOptions = [
    'Crisis Intervention',
    'Counseling',
    'Public Speaking',
    'Event Planning',
    'Administrative',
    'Social Media',
    'Teaching/Training',
    'Language Skills',
    'Technical Support'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handlePreferenceChange = (type, value, checked) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: {
          ...prev.preferences[type],
          [value]: checked
        }
      }
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/register', {
        ...formData,
        auth0Id: user?.sub
      });

      if (response.data.success) {
        // Redirect based on role
        navigate(formData.role === 'volunteer' ? '/volunteer' : '/participant');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Complete Your Profile</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please provide your information to complete the registration process
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="mb-6">
              <label className="text-lg font-medium text-gray-900">I want to register as a</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${
                    formData.role === 'participant' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleInputChange({ target: { name: 'role', value: 'participant' } })}
                >
                  <h3 className="text-lg font-medium">Participant</h3>
                  <p className="text-sm text-gray-500">Access support and resources</p>
                </div>
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${
                    formData.role === 'volunteer' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleInputChange({ target: { name: 'role', value: 'volunteer' } })}
                >
                  <h3 className="text-lg font-medium">Volunteer</h3>
                  <p className="text-sm text-gray-500">Help and support others</p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address.street"
                      id="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address.city"
                      id="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address.state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address.state"
                      id="address.state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address.zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address.zipCode"
                      id="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="emergencyContact.name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="emergencyContact.name"
                      id="emergencyContact.name"
                      value={formData.emergencyContact.name}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="emergencyContact.relationship" className="block text-sm font-medium text-gray-700">
                    Relationship
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="emergencyContact.relationship"
                      id="emergencyContact.relationship"
                      value={formData.emergencyContact.relationship}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="emergencyContact.phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="emergencyContact.phone"
                      id="emergencyContact.phone"
                      value={formData.emergencyContact.phone}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
              
              {/* Communication Preferences */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Communication Preferences</h4>
                <div className="space-y-2">
                  {Object.keys(formData.preferences.communicationPreferences).map(method => (
                    <div key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`comm-${method}`}
                        checked={formData.preferences.communicationPreferences[method]}
                        onChange={(e) => handlePreferenceChange('communicationPreferences', method, e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`comm-${method}`} className="ml-2 block text-sm text-gray-700 capitalize">
                        {method}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program Interests */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Program Interests</h4>
                <div className="grid grid-cols-2 gap-2">
                  {programOptions.map(program => (
                    <div key={program} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`program-${program}`}
                        checked={formData.preferences.programInterests.includes(program)}
                        onChange={(e) => {
                          const newInterests = e.target.checked
                            ? [...formData.preferences.programInterests, program]
                            : formData.preferences.programInterests.filter(p => p !== program);
                          setFormData(prev => ({
                            ...prev,
                            preferences: {
                              ...prev.preferences,
                              programInterests: newInterests
                            }
                          }));
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`program-${program}`} className="ml-2 block text-sm text-gray-700">
                        {program}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Availability</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(formData.preferences.availabilityPreferences).map(time => (
                    <div key={time} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`avail-${time}`}
                        checked={formData.preferences.availabilityPreferences[time]}
                        onChange={(e) => handlePreferenceChange('availabilityPreferences', time, e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`avail-${time}`} className="ml-2 block text-sm text-gray-700 capitalize">
                        {time}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Volunteer-specific fields */}
            {formData.role === 'volunteer' && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Volunteer Information</h3>
                
                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {skillOptions.map(skill => (
                      <div key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`skill-${skill}`}
                          checked={formData.volunteerInfo.skills.includes(skill)}
                          onChange={(e) => {
                            const newSkills = e.target.checked
                              ? [...formData.volunteerInfo.skills, skill]
                              : formData.volunteerInfo.skills.filter(s => s !== skill);
                            setFormData(prev => ({
                              ...prev,
                              volunteerInfo: {
                                ...prev.volunteerInfo,
                                skills: newSkills
                              }
                            }));
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`skill-${skill}`} className="ml-2 block text-sm text-gray-700">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <label htmlFor="volunteerInfo.experience" className="block text-sm font-medium text-gray-700">
                    Relevant Experience
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="volunteerInfo.experience"
                      name="volunteerInfo.experience"
                      rows={4}
                      value={formData.volunteerInfo.experience}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Background Check Consent */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="volunteerInfo.backgroundCheck"
                      name="volunteerInfo.backgroundCheck"
                      checked={formData.volunteerInfo.backgroundCheck}
                      onChange={handleInputChange}
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="volunteerInfo.backgroundCheck" className="ml-2 block text-sm text-gray-700">
                      I consent to a background check
                    </label>
                  </div>
                </div>

                {/* References */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">References</h4>
                  {formData.volunteerInfo.references.map((reference, index) => (
                    <div key={index} className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 mb-4">
                      <div>
                        <label htmlFor={`ref-name-${index}`} className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          id={`ref-name-${index}`}
                          value={reference.name}
                          onChange={(e) => {
                            const newRefs = [...formData.volunteerInfo.references];
                            newRefs[index] = { ...reference, name: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              volunteerInfo: {
                                ...prev.volunteerInfo,
                                references: newRefs
                              }
                            }));
                          }}
                          className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor={`ref-relationship-${index}`} className="block text-sm font-medium text-gray-700">
                          Relationship
                        </label>
                        <input
                          type="text"
                          id={`ref-relationship-${index}`}
                          value={reference.relationship}
                          onChange={(e) => {
                            const newRefs = [...formData.volunteerInfo.references];
                            newRefs[index] = { ...reference, relationship: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              volunteerInfo: {
                                ...prev.volunteerInfo,
                                references: newRefs
                              }
                            }));
                          }}
                          className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor={`ref-phone-${index}`} className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id={`ref-phone-${index}`}
                          value={reference.phone}
                          onChange={(e) => {
                            const newRefs = [...formData.volunteerInfo.references];
                            newRefs[index] = { ...reference, phone: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              volunteerInfo: {
                                ...prev.volunteerInfo,
                                references: newRefs
                              }
                            }));
                          }}
                          className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor={`ref-email-${index}`} className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          id={`ref-email-${index}`}
                          value={reference.email}
                          onChange={(e) => {
                            const newRefs = [...formData.volunteerInfo.references];
                            newRefs[index] = { ...reference, email: e.target.value };
                            setFormData(prev => ({
                              ...prev,
                              volunteerInfo: {
                                ...prev.volunteerInfo,
                                references: newRefs
                              }
                            }));
                          }}
                          className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                  {formData.volunteerInfo.references.length < 3 && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          volunteerInfo: {
                            ...prev.volunteerInfo,
                            references: [
                              ...prev.volunteerInfo.references,
                              { name: '', relationship: '', phone: '', email: '' }
                            ]
                          }
                        }));
                      }}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-500"
                    >
                      + Add another reference
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage; 