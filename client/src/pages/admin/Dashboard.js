import React, { useState, useEffect } from 'react';
import { FaUsers, FaCalendarCheck, FaGraduationCap, FaChartLine } from 'react-icons/fa';
import api from '../../services/api';
import { useUser } from '../../contexts/UserContext';
import StatsCard from '../../components/common/StatsCard';
import VolunteerTable from '../../components/admin/VolunteerTable';
import UpcomingEvents from '../../components/admin/UpcomingEvents';
import RegionalHeatmap from '../../components/admin/RegionalHeatmap';
import SearchVolunteers from '../../components/admin/SearchVolunteers';
import RagQueryInput from '../../components/admin/RagQueryInput';

function AdminDashboard() {
  const { userData } = useUser();
  const [stats, setStats] = useState({
    totalVolunteers: 0,
    activeTrainings: 0,
    upcomingEvents: 0,
    hoursLogged: 0
  });
  const [recentVolunteers, setRecentVolunteers] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch dashboard stats
        const statsResponse = await api.get('/admin/dashboard/stats');
        setStats(statsResponse.data);
        
        // Fetch recent volunteers
        const volunteersResponse = await api.get('/admin/volunteers/recent');
        setRecentVolunteers(volunteersResponse.data);
        
        // Fetch upcoming events
        const eventsResponse = await api.get('/admin/events/upcoming');
        setUpcomingEvents(eventsResponse.data);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {userData?.firstName || 'Admin'}
        </h1>
        <div className="text-sm text-gray-600">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Volunteers" 
          value={stats.totalVolunteers} 
          icon={<FaUsers className="text-blue-500" />} 
          change={+12}
        />
        <StatsCard 
          title="Active Trainings" 
          value={stats.activeTrainings} 
          icon={<FaGraduationCap className="text-green-500" />} 
          change={+3}
        />
        <StatsCard 
          title="Upcoming Events" 
          value={stats.upcomingEvents} 
          icon={<FaCalendarCheck className="text-purple-500" />} 
          change={+5}
        />
        <StatsCard 
          title="Hours Logged (Month)" 
          value={stats.hoursLogged} 
          icon={<FaChartLine className="text-orange-500" />} 
          change={+28}
        />
      </div>

      {/* RAG-powered search */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Smart Volunteer Search</h2>
        <RagQueryInput />
      </div>

      {/* Two-column layout for remaining content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Volunteer table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Recent Volunteers</h2>
            </div>
            <div className="p-6">
              <SearchVolunteers />
              <VolunteerTable volunteers={recentVolunteers} />
            </div>
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-8">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
            </div>
            <div className="p-6">
              <UpcomingEvents events={upcomingEvents} />
            </div>
          </div>

          {/* Regional Heatmap */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Volunteer Distribution</h2>
            </div>
            <div className="p-6">
              <RegionalHeatmap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
