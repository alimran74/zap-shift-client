import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">

      {/* 🔒 Background Lock GIF */}
      <img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
        alt="Forbidden GIF"
        className="absolute w-full h-full object-cover opacity-20 z-0"
      />

      {/* 🚫 Animated Icon or Alert */}
      <img
        src="https://media.giphy.com/media/ZcUGuVfDQnRfq/giphy.gif"
        alt="Access Denied"
        className="w-40 md:w-56 z-10 mb-4 animate-bounce"
      />

      <div className="text-center z-10 px-6 py-8 bg-black/70 rounded-lg backdrop-blur-sm border border-red-500 shadow-2xl max-w-lg">
        <h1 className="text-6xl font-extrabold text-red-500 mb-2">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
        <p className="text-gray-300 mb-6">
          Oops! You do not have permission to view this page.
        </p>

        <Link
          to="/"
          className="btn btn-accent btn-outline hover:scale-105 transition duration-300"
        >
          🏠 Back to Home
        </Link>
      </div>

      {/* 🔥 Decorative Animated Spark */}
      <img
        src="https://media.giphy.com/media/fxJ8yya4jvKbm/giphy.gif"
        alt="Fire Spark"
        className="absolute bottom-4 right-4 w-20 md:w-28 opacity-50 animate-pulse"
      />
    </div>
  );
};

export default Forbidden;
