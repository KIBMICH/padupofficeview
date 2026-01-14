import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  highlighted = false,
}) => {
  return (
    <div
      className={`rounded-lg shadow-md p-6 transition-all duration-200 ${
        highlighted
          ? 'ring-2 ring-lemonGreen shadow-lg scale-105'
          : 'hover:shadow-lg'
      } ${className}`}
    >
      {children}
    </div>
  );
};
