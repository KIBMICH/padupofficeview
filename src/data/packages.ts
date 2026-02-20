import { Package, AccountType, PackageType } from '../types';

export const salesAgentPackages: Package[] = [
  {
    id: PackageType.MICRO,
    name: 'Micro',
    price: 35000,
    commission: 0.5,
    accountType: AccountType.SALES_AGENT,
  },
  {
    id: PackageType.STANDARD,
    name: 'Standard',
    price: 78000,
    commission: 1,
    accountType: AccountType.SALES_AGENT,
  },
  {
    id: PackageType.EXECUTIVE,
    name: 'Executive',
    price: 117000,
    commission: 1.5,
    accountType: AccountType.SALES_AGENT,
  },
  {
    id: PackageType.PREMIUM,
    name: 'Premium',
    price: 195000,
    commission: 1.75,
    isPopular: true,
    accountType: AccountType.SALES_AGENT,
  },
  {
    id: PackageType.PROFESSIONAL,
    name: 'Professional',
    price: 293000,
    commission: 2,
    accountType: AccountType.SALES_AGENT,
  },
];

export const distributorPackages: Package[] = [
  {
    id: PackageType.MINOR_DISTRIBUTOR,
    name: 'Minor Distributor',
    price: 975000,
    commission: 3,
    accountType: AccountType.DISTRIBUTOR,
  },
  {
    id: PackageType.MAJOR_DISTRIBUTOR,
    name: 'Major Distributor',
    price: 2500000,
    commission: 5,
    isPopular: true,
    accountType: AccountType.DISTRIBUTOR,
  },
];

export const allPackages = [...salesAgentPackages, ...distributorPackages];
