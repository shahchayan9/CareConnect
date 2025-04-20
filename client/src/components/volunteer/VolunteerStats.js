import React from 'react';
import { FaClock, FaCalendarCheck, FaGraduationCap, FaAward } from 'react-icons/fa';

function VolunteerStats({ stats }) {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-3 rounded-md bg-blue-50">
            <FaClock className="text-blue-500" />
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500">Hours Logged</p>
            <p className="text-lg font-semibold text-gray-900">{stats.hoursLogged}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-3 rounded-md bg-green-50">
            <FaCalendarCheck className="text-green-500" />
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500">Events Attended</p>
            <p className="text-lg font-semibold text-gray-900">{stats.eventsAttended}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-3 rounded-md bg-purple-50">
            <FaGraduationCap className="text-purple-500" />
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500">Trainings Completed</p>
            <p className="text-lg font-semibold text-gray-900">{stats.trainingsCompleted}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-3 rounded-md bg-yellow-50">
            <FaAward className="text-yellow-500" />
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500">Achievement Level</p>
            <p className="text-lg font-semibold text-gray-900">
              {stats.hoursLogged < 10 ? 'Newcomer' :
               stats.hoursLogged < 50 ? 'Helper' :
               stats.hoursLogged < 100 ? 'Supporter' : 'Champion'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default VolunteerStats;
