import React from 'react';
import { SignupForm } from '../components/signup/SignupForm';

export const SignupFormPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <SignupForm />
    </div>
  );
};
