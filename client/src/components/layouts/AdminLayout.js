import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  FaHome, 
  FaUsers, 
  FaCalendarAlt, 
  FaGraduationCap, 
  FaChartBar, 
  FaMapMarkedAlt, 
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt
} from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext';

function AdminLayout() {
  const { logout } = useAuth0();
  const { userData } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', to: '/admin', icon: FaHome },
    { name: 'Volunteers', to: '/admin/volunteers', icon: FaUsers },
    { name: 'Events', to: '/admin/events', icon: FaCalendarAlt },
    { name: 'Trainings', to: '/admin/trainings', icon: FaGraduationCap },
    { name: 'Volunteer Map', to: '/admin/map', icon: FaMapMarkedAlt },
    { name: 'Reports', to: '/admin/reports', icon: FaChartBar },
    { name: 'Settings', to: '/admin/settings', icon: FaCog },
  ];

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="CommunityCare"
              />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                CommunityCare
              </span>
            </div>
            
            <div className="mt-8 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-5 w-5 ${
                          isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.name}
                    </Link>
                    );
                })}
              </nav>
            </div>
          </div>
          
          {/* User profile */}
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium uppercase">
                    {userData?.firstName?.charAt(0) || 'A'}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {userData?.firstName} {userData?.lastName}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    Administrator
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto p-1 rounded-full text-gray-400 hover:text-gray-500"
                >
                  <FaSignOutAlt className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        {mobileMenuOpen && (
          <div className="fixed inset-0 flex z-40">
            <div className="fixed inset-0">
              <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
            </div>
            
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Close sidebar</span>
                  <FaTimes className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="/logo.png"
                    alt="CommunityCare"
                  />
                  <span className="ml-2 text-lg font-semibold text-gray-900">
                    CommunityCare
                  </span>
                </div>
                
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon
                          className={`mr-4 flex-shrink-0 h-6 w-6 ${
                            isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium uppercase">
                        {userData?.firstName?.charAt(0) || 'A'}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700">
                        {userData?.firstName} {userData?.lastName}
                      </p>
                      <p className="text-sm font-medium text-gray-500">
                        Administrator
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="ml-auto p-1 rounded-full text-gray-400 hover:text-gray-500"
                    >
                      <FaSignOutAlt className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-14"></div>
          </div>
        )}
      </div>
      
      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span className="sr-only">Open sidebar</span>
            <FaBars className="h-6 w-6" />
          </button>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
