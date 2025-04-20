import React from 'react';

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">About MindfulMatch</h1>
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          MindfulMatch is a comprehensive volunteer management platform designed specifically for NAMI Yolo to streamline the coordination of mental health support services.
        </p>
        <p className="mt-4 text-lg text-gray-600">
          Our platform helps match volunteers with appropriate opportunities based on their training, skills, and availability, while providing robust tools for administrators to track volunteer engagement and program impact.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
