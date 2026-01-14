import React from 'react';
import { benefits } from '../data/benefits';
import { HeroSection } from '../components/signup/HeroSection';
import { BenefitsSection } from '../components/signup/BenefitsSection';
import { PackagesOverview } from '../components/signup/PackagesOverview';
import { CTASection } from '../components/signup/CTASection';

export const SignupPage: React.FC = () => {
  const handleScrollToSignup = () => {
    // Navigate to signup form page or modal
    window.location.href = '/signup-form';
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection onScrollToForm={handleScrollToSignup} />
      <BenefitsSection benefits={benefits} />
      <PackagesOverview />
      <CTASection onScrollToForm={handleScrollToSignup} />
    </div>
  );
};
