import React from 'react';
import { Package, AccountType } from '../../types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface PackagesSectionProps {
  packages: Package[];
  accountType: AccountType;
  onSelectPackage: (packageId: string) => void;
  selectedPackageId?: string;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  packages,
  accountType,
  onSelectPackage,
  selectedPackageId,
}) => {
  const title =
    accountType === AccountType.SALES_AGENT
      ? 'Sales Agent Packages'
      : 'Distributor Packages';

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{title}</h3>
      <div className={`grid gap-6 ${
        accountType === AccountType.SALES_AGENT
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1 md:grid-cols-2'
      }`}>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-lg border-2 transition-all cursor-pointer ${
              selectedPackageId === pkg.id
                ? 'border-lemonGreen bg-white shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300'
            } ${pkg.isPopular ? 'lg:scale-105' : ''}`}
            onClick={() => onSelectPackage(pkg.id)}
          >
            <div className="p-6">
              {pkg.isPopular && (
                <div className="bg-brandOrange text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  Premium
                </div>
              )}

              <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>

              <div className="mb-4">
                <p className="text-3xl font-bold text-lemonGreen">
                  ₦{(pkg.price / 1000).toFixed(0)}K
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-brandOrange">{pkg.commission}%</span> Commission
                </p>
              </div>

              <ul className="space-y-2 mb-6 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-lemonGreen">✓</span>
                  <span>Full support access</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lemonGreen">✓</span>
                  <span>Marketing materials</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lemonGreen">✓</span>
                  <span>Training included</span>
                </li>
              </ul>

              <Button
                variant={selectedPackageId === pkg.id ? 'primary' : 'outline'}
                size="sm"
                className="w-full"
                onClick={() => onSelectPackage(pkg.id)}
              >
                {selectedPackageId === pkg.id ? '✓ Selected' : 'Select'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
