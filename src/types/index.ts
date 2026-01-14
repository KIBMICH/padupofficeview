export enum AccountType {
  SALES_AGENT = 'sales_agent',
  DISTRIBUTOR = 'distributor',
}

export enum PackageType {
  STANDARD = 'standard',
  EXECUTIVE = 'executive',
  PREMIUM = 'premium',
  PROFESSIONAL = 'professional',
  MINOR_DISTRIBUTOR = 'minor_distributor',
  MAJOR_DISTRIBUTOR = 'major_distributor',
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Package {
  id: PackageType;
  name: string;
  price: number;
  commission: number;
  isPopular?: boolean;
  accountType: AccountType;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  accountType: AccountType;
  packageId: PackageType;
  password: string;
  confirmPassword: string;
}

export interface TrackingResult {
  orderId: string;
  status: OrderStatus;
  estimatedDelivery: string;
  timeline: TimelineStep[];
}

export enum OrderStatus {
  PLACED = 'placed',
  DISPATCHED = 'dispatched',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
}

export interface TimelineStep {
  status: OrderStatus;
  label: string;
  completed: boolean;
  date?: string;
}
