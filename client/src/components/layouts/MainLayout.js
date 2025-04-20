import React from 'react';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">MindfulMatch</span>
            </div>
            <nav className="hidden md:flex space-x-10">
              <a href="/" className="text-gray-500 hover:text-gray-900">Home</a>
              <a href="/about" className="text-gray-500 hover:text-gray-900">About</a>
              <a href="/login" className="text-gray-500 hover:text-gray-900">Login</a>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} MindfulMatch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
