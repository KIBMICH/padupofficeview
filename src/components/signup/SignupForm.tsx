import React, { useState } from 'react';
import { AccountType, PackageType } from '../../types';
import { salesAgentPackages, distributorPackages } from '../../data/packages';

interface SignupFormProps {
  onSubmit?: (data: SignupFormData) => void;
}

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  state: string;
  address: string;
  companyName: string;
  role: AccountType;
  packageId: PackageType;
  password: string;
  confirmPassword: string;
  referralCode: string;
  contactMethod: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    state: '',
    address: '',
    companyName: '',
    role: AccountType.SALES_AGENT,
    packageId: PackageType.STANDARD,
    password: '',
    confirmPassword: '',
    referralCode: '',
    contactMethod: '',
    agreeToTerms: false,
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email is optional, but if provided, must be valid
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone number is required and must match Nigerian format
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else {
      // Nigerian phone number validation
      // Accepts formats: 08012345678, +2348012345678, 2348012345678, 0701234567, +2347012345678
      const nigerianPhoneRegex = /^(\+?234|0)?[7-9][0-1]\d{8}$/;
      const cleanedPhone = formData.phoneNumber.replace(/[\s-]/g, '');
      
      if (!nigerianPhoneRegex.test(cleanedPhone)) {
        newErrors.phoneNumber = 'Please enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)';
      }
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name === 'role') {
      setFormData((prev) => ({
        ...prev,
        role: value as AccountType,
        packageId:
          value === AccountType.SALES_AGENT
            ? PackageType.STANDARD
            : PackageType.MINOR_DISTRIBUTOR,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Format data to match the API requirements
      const apiData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        state: formData.state,
        address: formData.address,
        role: formData.role === AccountType.SALES_AGENT ? 'sales_agent' : 'distributor',
        package_type: formData.packageId,
        referral_code: formData.referralCode || '',
        password: formData.password,
      };

      console.log('Submitting data:', apiData);

      // Use Vercel serverless function as proxy
      const response = await fetch('/api/submit_customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      console.log('Response status:', response.status);
      
      // Try to parse response as JSON
      let result;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.log('Response text:', text);
        result = { success: response.ok };
      }

      console.log('Response data:', result);

      // Check if submission was successful
      if (response.ok || result.success) {
        setSubmitStatus('success');
        onSubmit?.(formData);
        
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          state: '',
          address: '',
          companyName: '',
          role: AccountType.SALES_AGENT,
          packageId: PackageType.STANDARD,
          password: '',
          confirmPassword: '',
          referralCode: '',
          contactMethod: '',
          agreeToTerms: false,
        });
      } else {
        // Handle specific error codes
        let errorMsg = result.message || 'Submission failed';
        if (response.status === 409) {
          errorMsg = 'This email or phone number is already registered. Please use a different one or login.';
        } else if (response.status === 400) {
          errorMsg = 'Invalid data provided. Please check your information.';
        }
        setErrorMessage(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Submission error:', error);
      
      // Provide more specific error messages
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        setErrorMessage('Unable to connect to the server. This might be a CORS issue or network problem. Please check your connection or contact support.');
      } else if (!errorMessage) {
        setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
      }
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const currentPackages =
    formData.role === AccountType.SALES_AGENT
      ? salesAgentPackages
      : distributorPackages;

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Join Our Portal</h2>
        <p className="text-gray-500 text-sm">
          Register as a Sales Agent or Distributor to unlock exclusive benefits.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-lemonGreen text-black rounded-lg text-sm">
          <div className="font-semibold mb-2 text-center">✓ Account created successfully!</div>
          <p className="text-center mb-3">Please check your phone or email for your login details.</p>
          <p className="text-center mb-3">You can now login at:</p>
          <a 
            href="https://www.padupoffice.com/customers/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-center text-blue-700 hover:text-blue-900 underline font-medium"
          >
            www.padupoffice.com/customers
          </a>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-500 text-white rounded-lg text-sm">
          <div className="font-semibold mb-1">✗ An error occurred</div>
          <div className="text-xs">{errorMessage || 'Please try again.'}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email (Optional)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john.doe@example.com"
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="08012345678 or +2348012345678"
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="text-gray-400 text-xs mt-1">Enter a valid Nigerian phone number</p>
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="Lagos"
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="123 Main St, City"
            rows={3}
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen resize-none ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        {/* Company Name (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name (Optional)
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Your Company Inc."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen"
          />
        </div>

        {/* Your Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Role
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value={AccountType.SALES_AGENT}
                checked={formData.role === AccountType.SALES_AGENT}
                onChange={handleInputChange}
                className="w-4 h-4 text-lemonGreen accent-lemonGreen"
              />
              <span className="text-sm text-gray-700">Sales Agent</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value={AccountType.DISTRIBUTOR}
                checked={formData.role === AccountType.DISTRIBUTOR}
                onChange={handleInputChange}
                className="w-4 h-4 text-lemonGreen accent-lemonGreen"
              />
              <span className="text-sm text-gray-700">Distributor</span>
            </label>
          </div>
        </div>

        {/* Package Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Package Selection
          </label>
          <select
            name="packageId"
            value={formData.packageId}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen appearance-none bg-white"
          >
            {currentPackages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} (₦{pkg.price.toLocaleString()} - {pkg.commission}% discount)
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••"
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <p className="text-gray-400 text-xs mt-1">
            Must be at least 8 characters, include a number, a symbol, and both upper and lower case letters.
          </p>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="••••••••"
            className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Referral Code (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Referral Code (Optional)
          </label>
          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleInputChange}
            placeholder="Optional referral code"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen"
          />
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Contact Method
          </label>
          <select
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lemonGreen appearance-none bg-white"
          >
            <option value="">Select contact method</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </div>

        {/* Terms & Conditions */}
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="w-4 h-4 mt-0.5 accent-lemonGreen"
            />
            <span className="text-sm text-gray-600">
              I agree to the <a href="#" className="text-brandOrange hover:underline">Terms & Conditions</a>
            </span>
          </label>
          {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-lemonGreen text-black font-semibold py-3 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Account...' : 'Sign Up Now'}
        </button>
      </form>
    </div>
  );
};
