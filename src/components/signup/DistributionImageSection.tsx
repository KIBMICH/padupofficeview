import React from 'react';
import distImage from '../../assets/images/dist.jpg';

export const DistributionImageSection: React.FC = () => {
  return (
    <section className="w-full">
      <img 
        src={distImage} 
        alt="Distribution network" 
        className="w-full h-auto object-cover"
      />
    </section>
  );
};
