import React from 'react';
import { Benefit } from '../../types';

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ benefits }) => {
  return (
    <section className="py-10 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-black mb-1">
            Why Partner With Us?
          </h2>
          <p className="text-gray-600 text-xs">
            Joining us means unlocking a world of opportunities and rewards. Here's what you can expect:
          </p>
        </div>

        <div className="space-y-2 max-w-2xl">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex gap-2 items-start">
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center h-4 w-4 rounded-full bg-lemonGreen text-black">
                  <span className="text-xs">✓</span>
                </div>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                {benefit.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
