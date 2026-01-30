import React from 'react';
import { salesAgentPackages, distributorPackages } from '../../data/packages';

const packageFeatures: Record<string, string[]> = {
  standard: [
    'Marketing materials/advert',
    'Training included',
    'Online portal access',
  ],
  executive: [
    'Marketing materials/advert',
    'Training included',
    'Online portal access',
    'Community support group',
  ],
  premium: [
    'Marketing materials/advert',
    'Training included',
    'Online portal access',
    'Community support group',
    'Referrals of customers',
  ],
  professional: [
    'Marketing materials/advert',
    'Training included',
    'Online portal access',
    'Community support group',
    'Monthly performance bonus',
    'Referrals of customers',
  ],
  minor_distributor: [
    'Customer marketing materials and adverts',
    'Advances sales training',
    'Online portal access',
    'Monthly performance bonus',
    'Lead referral',
    'Community support group',
    'Territory protection',
  ],
  major_distributor: [
    'Customer marketing materials and advert',
    'Advanced sales training',
    'Online portal access',
    'Lead referral (dedicated manager)',
    'Quarterly product samples',
    'Territory protection',
    'Local event support',
    'Exclusive state right',
    'Customised product packaging',
    'Board of advisors seat',
    'Annual retreat for top performers',
    'Dedicated 24/7 vip support',
  ],
};

export const PackagesOverview: React.FC = () => {
  return (
    <section className="py-10 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Our Partnership Packages
          </h2>
          <p className="text-gray-600 text-sm">
            Choose the plan that best suits your ambitions and start your journey with us
          </p>
        </div>

        {/* Sales Agent Packages */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-black mb-4 text-left">
            Sales Agent Packages
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {salesAgentPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-lg border-2 bg-white ${
                  pkg.isPopular ? 'border-lemonGreen' : 'border-gray-300'
                }`}
              >
                <div className="p-3">
                  {pkg.isPopular && (
                    <div className="bg-lemonGreen text-black text-xs font-bold px-2 py-0.5 rounded inline-block mb-2">
                      Premium
                    </div>
                  )}

                  <h4 className="text-sm font-bold text-black mb-1">
                    {pkg.name}
                  </h4>

                  <p className="text-xl font-bold text-lemonGreen mb-0.5">
                    ₦{pkg.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-brandOrange font-bold mb-2">
                    {pkg.commission}% discount
                  </p>

                  <ul className="text-xs text-gray-600 mb-3 space-y-0.5">
                    {packageFeatures[pkg.id]?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-lemonGreen">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="w-full bg-lemonGreen text-black text-xs font-bold py-1.5 rounded hover:bg-opacity-90"
                    onClick={() => (window.location.href = '/signup-form')}
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Distributor Packages */}
        <div>
          <h3 className="text-lg font-bold text-black mb-4 text-center">
            Distributor Packages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {distributorPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-lg border-2 bg-white ${
                  pkg.isPopular ? 'border-brandOrange' : 'border-gray-300'
                }`}
              >
                <div className="p-5">
                  {pkg.isPopular && (
                    <div className="bg-brandOrange text-white text-xs font-bold px-2 py-0.5 rounded inline-block mb-2">
                      Negotiable discount
                    </div>
                  )}

                  <h4 className="text-base font-bold text-black mb-1">
                    {pkg.name}
                  </h4>

                  <p className="text-2xl font-bold text-lemonGreen mb-0.5">
                    {pkg.price >= 1000000 
                      ? `₦${(pkg.price / 1000000).toFixed(1)} Million`
                      : `₦${pkg.price.toLocaleString()}`
                    }
                  </p>
                  <p className="text-sm text-brandOrange font-bold mb-3">
                    {pkg.commission}% discount
                  </p>

                  <ul className="text-xs text-gray-600 mb-4 space-y-1">
                    {packageFeatures[pkg.id]?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-lemonGreen">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full text-sm font-bold py-2 rounded ${
                      pkg.isPopular
                        ? 'bg-brandOrange text-white hover:bg-opacity-90'
                        : 'bg-lemonGreen text-black hover:bg-opacity-90'
                    }`}
                    onClick={() => (window.location.href = '/signup-form')}
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
