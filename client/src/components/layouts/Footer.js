import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <img
                className="h-10 w-auto"
                src="/logo.png"
                alt="CommunityCare"
              />
              <span className="ml-3 text-xl font-bold text-gray-900">
                CommunityCare
              </span>
            </div>
            <p className="text-gray-500 text-base">
              Empowering volunteers to support mental health services in Yolo County.
              A platform for NAMI Yolo to streamline volunteer management.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  About
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-base text-gray-500 hover:text-gray-900">
                      Our Mission
                    </Link>
                  </li>
                  <li>
                    <Link to="/about/team" className="text-base text-gray-500 hover:text-gray-900">
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link to="/about/partners" className="text-base text-gray-500 hover:text-gray-900">
                      Partners
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-base text-gray-500 hover:text-gray-900">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/resources" className="text-base text-gray-500 hover:text-gray-900">
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-base text-gray-500 hover:text-gray-900">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link to="/crisis" className="text-base text-gray-500 hover:text-gray-900">
                      Crisis Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Get Involved
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/volunteer" className="text-base text-gray-500 hover:text-gray-900">
                      Volunteer
                    </Link>
                  </li>
                  <li>
                    <Link to="/donate" className="text-base text-gray-500 hover:text-gray-900">
                      Donate
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" className="text-base text-gray-500 hover:text-gray-900">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/programs" className="text-base text-gray-500 hover:text-gray-900">
                      Programs
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/accessibility" className="text-base text-gray-500 hover:text-gray-900">
                      Accessibility
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} CommunityCare for NAMI Yolo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
