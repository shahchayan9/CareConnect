import React from 'react';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h2 className="text-9xl font-extrabold text-blue-600">404</h2>
        <p className="mt-2 text-3xl font-bold text-gray-900">Page not found</p>
        <p className="mt-4 text-lg text-gray-600">The page you are looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <a href="/" className="text-base font-medium text-blue-600 hover:text-blue-500">
            Go back home <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
