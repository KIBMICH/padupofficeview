import React from 'react';
import { SignupForm } from '../components/signup/SignupForm';

export const SignupFormPage: React.FC = () => {
  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // TODO: Send data to backend API
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <SignupForm onSubmit={handleFormSubmit} />
    </div>
  );
};
