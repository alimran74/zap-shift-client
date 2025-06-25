import React from 'react';

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center gap-4 
                    hover:bg-[#CAEB66] transition-all duration-300 hover:shadow-xl group cursor-pointer">
      {/* Icon */}
      <div className="text-5xl text-primary transition-colors duration-300 group-hover:text-white">
        <Icon />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-primary transition-colors duration-300 group-hover:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 transition-colors duration-300 group-hover:text-white">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;

