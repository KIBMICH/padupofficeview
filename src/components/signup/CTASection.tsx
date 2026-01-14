import React from 'react';

interface CTASectionProps {
  onScrollToForm: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onScrollToForm }) => {
  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-lg font-bold text-black mb-4">
          Want to know more? Sign up today and<br />start earning more.
        </h2>
        <button
          onClick={() => (window.location.href = '/signup-form')}
          className="bg-lemonGreen text-black text-xs font-semibold px-6 py-2 rounded-md hover:bg-opacity-90"
        >
          Sign Up
        </button>
      </div>
    </section>
  );
};
