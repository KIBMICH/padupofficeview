import React from 'react';
import heroImage from '../../assets/images/hero.png';

interface HeroSectionProps {
  onScrollToForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToForm }) => {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Welcome!
            </h1>
            <p className="text-base text-gray-700 mb-6 leading-relaxed">
              You are here to enjoy amazing benefits when you sign up as a sales agent or a distributor.
            </p>
            <div className="flex gap-3 mb-6">
              <button
                onClick={onScrollToForm}
                className="bg-lemonGreen text-black text-sm font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 shadow-md hover:shadow-lg transition-all"
              >
                Sign Up Now
              </button>
              <button
                onClick={onScrollToForm}
                className="border-2 border-brandOrange text-brandOrange text-sm font-semibold px-6 py-3 rounded-lg hover:bg-orange-50 transition-all"
              >
                Learn More
              </button>
            </div>
            
            {/* Trust indicators */}
            <p className="text-gray-500 text-sm mb-3">Trusted by distributors nationwide.</p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-lemonGreen">🏆</span>
                <span>Award-winning services</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lemonGreen">💰</span>
                <span>High earning potential</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lemonGreen">🌐</span>
                <span>Global network</span>
              </div>
            </div>
          </div>

          {/* Right Illustration - Hero Image */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-lemonGreen rounded-3xl w-full max-w-md h-80 flex items-center justify-center overflow-hidden shadow-xl">
              <img 
                src={heroImage} 
                alt="Partnership illustration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
