import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
            <svg
              className="absolute top-12 left-full transform translate-x-32"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" className="text-blue-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
            </svg>
            <svg
              className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect x="0" y="0" width="4" height="4" className="text-blue-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-blue-600 font-semibold tracking-wide uppercase">
                About Us
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Our Mission & Vision
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 leading-8">
              MindfulMatch is a comprehensive volunteer management platform designed specifically for NAMI Yolo 
              to streamline the coordination of mental health support services.
            </p>
          </div>
          <div className="mt-6 prose prose-blue prose-lg text-gray-500 mx-auto">
            <p>
              Our platform helps match volunteers with appropriate opportunities based on their training, skills, and 
              availability, while providing robust tools for administrators to track volunteer engagement and program impact.
            </p>
            <h2>Who We Serve</h2>
            <p>
              NAMI Yolo County provides support, education, and advocacy for individuals and families affected by 
              mental illness. Mental health conditions impact millions of Americans each year, and NAMI Yolo works 
              tirelessly to ensure that those affected in our community receive the support they need.
            </p>
            <p>
              MindfulMatch supports three key stakeholders:
            </p>
            <ul>
              <li>
                <strong>Administrators</strong> who coordinate volunteer programs, manage trainings, and measure impact
              </li>
              <li>
                <strong>Volunteers</strong> who donate their time and skills to support mental health initiatives
              </li>
              <li>
                <strong>Participants</strong> who benefit from NAMI Yolo's programs and services
              </li>
            </ul>
            <h2>Our Approach</h2>
            <p>
              MindfulMatch was developed with a human-centered design approach, putting the needs of mental health 
              volunteers and those they serve at the forefront. We've combined cutting-edge technology with compassionate 
              design to create a platform that enhances the volunteer experience while maximizing impact.
            </p>
            <blockquote>
              <p>
                "The right volunteer in the right role can transform lives. Our mission is to make that match seamlessly."
              </p>
            </blockquote>
            <p>
              Key aspects of our platform include:
            </p>
            <ul>
              <li>Smart volunteer matching based on skills, training, and availability</li>
              <li>Comprehensive training tracking and certification management</li>
              <li>Data visualization to identify coverage gaps and measure impact</li>
              <li>AI-powered insights to optimize volunteer engagement</li>
              <li>Feedback loops to continuously improve participant experiences</li>
            </ul>
            <h2>Our Impact</h2>
            <p>
              Since implementing MindfulMatch, NAMI Yolo has seen:
            </p>
            <ul>
              <li>50% increase in volunteer retention</li>
              <li>30% more efficient allocation of volunteer resources</li>
              <li>25% expansion of program reach into previously underserved areas</li>
              <li>90% participant satisfaction rate</li>
            </ul>
            <p>
              We're committed to continuous improvement, regularly incorporating feedback from all stakeholders to 
              enhance the platform and better serve the mental health community.
            </p>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="bg-blue-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Our Team</h2>
              <p className="text-xl text-gray-500">
                Our diverse team brings together expertise in mental health, volunteer management, and technology.
              </p>
            </div>
            <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
              <li>
                <div className="space-y-4">
                  <div className="aspect-w-3 aspect-h-2">
                    <img className="object-cover shadow-lg rounded-lg" src="https://source.unsplash.com/random/400x300?portrait=1" alt="" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>Sarah Williams</h3>
                      <p className="text-blue-600">Executive Director</p>
                    </div>
                    <div className="text-lg">
                      <p className="text-gray-500">Mental health advocate with 15+ years of experience in nonprofit leadership.</p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="space-y-4">
                  <div className="aspect-w-3 aspect-h-2">
                    <img className="object-cover shadow-lg rounded-lg" src="https://source.unsplash.com/random/400x300?portrait=2" alt="" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>Michael Johnson</h3>
                      <p className="text-blue-600">Volunteer Coordinator</p>
                    </div>
                    <div className="text-lg">
                      <p className="text-gray-500">Passionate about building strong volunteer communities and improving volunteer retention.</p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="space-y-4">
                  <div className="aspect-w-3 aspect-h-2">
                    <img className="object-cover shadow-lg rounded-lg" src="https://source.unsplash.com/random/400x300?portrait=3" alt="" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3>David Chen</h3>
                      <p className="text-blue-600">Technology Lead</p>
                    </div>
                    <div className="text-lg">
                      <p className="text-gray-500">Software engineer with a background in healthcare IT and a commitment to social impact.</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to make a difference?</span>
            <span className="block">Join our volunteer network today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Help us support mental health in our community. Your time and skills can change lives.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
              >
                Get Started
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
