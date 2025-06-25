import React from 'react';
import Marquee from 'react-fast-marquee';

// ✅ Import images from assets
import amazon from '../../../assets/brands/amazon.png';
import amazonVector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import startPeople from '../../../assets/brands/start-people 1.png';
import start from '../../../assets/brands/start.png';

const logos = [
  amazon,
  amazonVector,
  casio,
  moonstar,
  randstad,
  startPeople,
  start,
];

const ClientLogos = () => {
  return (
    <div className="py-16 bg-gray-200">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">
        Trusted by Leading Companies
      </h2>

      <Marquee speed={50} pauseOnHover={true} gradient={false}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-12"> {/* 48px left & right = 96px gap */}
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className="h-6 w-auto object-contain" // 24px height
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientLogos;
