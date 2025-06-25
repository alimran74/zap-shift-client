import React from "react";
import trackingImg from "../../../assets/live-tracking.png";
import safeDeliveryImg from "../../../assets/safe-delivery.png";
import supportImg from "../../../assets/safe-delivery.png";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
    image: trackingImg,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safeDeliveryImg,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: supportImg,
  },
];

const WhyChooseUs = () => {
  return (
    <div
      className="py-16 bg-gray-200 rounded-md shadow-sm
  border-t-2  
   border-dashed border-gray-800
"
    >
      <div className="max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="
          flex flex-col md:flex-row items-center gap-6 py-6 border-b last:border-none mb-6
          transition-transform duration-300 ease-in-out
          hover:scale-105 hover:shadow-lg hover:shadow-gray-300
          rounded-xl bg-white px-6
        "
          >
            {/* Image */}
            <div
              className="w-full md:w-1/3 flex justify-center
          md:border-r-2 md:border-dashed md:border-gray-400 md:pr-6
        "
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="h-32 object-contain"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
