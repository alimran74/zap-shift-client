import React from "react";
import location from "../../../assets/location-merchant.png";
import bgImage from "../../../assets/be-a-merchant-bg.png";

const BeMerchant = () => {
  return (
    <div className="bg-gray-200 py-12 px-4">
      <div data-aos="zoom-in-up"
        className="hero max-w-7xl mx-auto rounded-4xl bg-[#03373D] bg-no-repeat bg-top bg-contain p-6 md:p-16"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse text-white gap-10">
          <img
            src={location}
            alt="Location"
            className="w-full max-w-xs md:max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Merchant and Customer Satisfaction is Our First Priority
            </h1>
            <p className="py-4 text-gray-100">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
            </p>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <button className="btn text-xl text-black p-6 rounded-4xl font-bold bg-[#CAEB66]">
                Become a Merchant
              </button>
              <button className="btn text-xl hover:text-black p-6 rounded-4xl font-bold hover:bg-[#CAEB66] cursor-pointer">
                Become a Merchant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
