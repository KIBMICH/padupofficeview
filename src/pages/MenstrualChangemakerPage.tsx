import React from 'react';
import fellowshipImage from '../assets/images/fellowship.jpeg';

export const MenstrualChangemakerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <div className="relative w-full">
        <img 
          src={fellowshipImage} 
          alt="Menstrual Changemakers Fellowship" 
          className="w-full h-[300px] md:h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
              MENSTRUAL CHANGEMAKERS<br />FELLOWSHIP
            </h1>
            <p className="text-base md:text-xl text-white max-w-2xl mx-auto">
              Empowering the next generation of African leaders in menstrual health
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-16">
        {/* About Section */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 md:mb-6">
            About the Fellowship
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Are you passionate about making a global impact? Pad-Up Creations is looking for 
            dedicated individuals to join our mission. This fellowship offers intensive training 
            and a pathway to professional involvement in the menstrual health space.
          </p>
        </div>

        {/* Two Column Layout for Desktop */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Program Structure */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 md:mb-6">
              Program Structure
            </h2>
            <div className="space-y-4 md:space-y-5">
              <div>
                <h3 className="font-bold text-black text-lg mb-1">Duration</h3>
                <p className="text-gray-700">6 Weeks of intensive online training</p>
              </div>
              <div>
                <h3 className="font-bold text-black text-lg mb-1">Commitment</h3>
                <p className="text-gray-700">8 hours per week during the training phase</p>
              </div>
              <div>
                <h3 className="font-bold text-black text-lg mb-1">Post-Training</h3>
                <p className="text-gray-700">Graduates must be willing to commit at least 6 hours per week for a stipend-based role</p>
              </div>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 md:mb-6">
              Eligibility Criteria
            </h2>
            <div className="space-y-4 md:space-y-5">
              <div>
                <h3 className="font-bold text-black text-lg mb-1">Location</h3>
                <p className="text-gray-700">Currently open to Africans only</p>
              </div>
              <div>
                <h3 className="font-bold text-black text-lg mb-1">Age</h3>
                <p className="text-gray-700">Applicants must be 18 years and above</p>
              </div>
              <div>
                <h3 className="font-bold text-black text-lg mb-1">Passion</h3>
                <p className="text-gray-700">A strong desire to drive change in menstrual health management</p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Details - Full Width CTA */}
        <div className="bg-brandOrange text-white p-6 md:p-10 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
            Application Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <p className="text-sm md:text-base font-semibold mb-2">Deadline</p>
              <p className="text-xl md:text-2xl font-bold">8th March, 2026</p>
              <p className="text-base md:text-lg">2:00 PM WAT</p>
            </div>
            <div>
              <p className="text-sm md:text-base font-semibold mb-2">How to Apply</p>
              <p className="text-sm md:text-base break-all">www.padupcreations.com/menstrualchangemaker</p>
            </div>
          </div>
          
          <a
            href="https://www.padupcreations.com/menstrualchangemaker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-brandOrange font-bold px-6 md:px-10 py-3 md:py-4 rounded-lg hover:bg-gray-100 transition-all text-base md:text-lg"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};
