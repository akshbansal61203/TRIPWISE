import React from "react";

function Pricing() {
  return (
    <div className="mt-20 flex flex-col items-center px-4">
      {/* Title */}
      <h2 className="font-bold text-3xl my-5 text-center">
        🌍 AI-Powered Trip Planning – Pick Your Plan
      </h2>

      {/* Pricing Card */}
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg p-6 text-center">
        {/* Plan Title */}
        <h3 className="text-lg font-semibold mb-2">Monthly</h3>

        {/* Price */}
        <p className="text-3xl font-bold mb-1">$7.99
          <span className="text-sm font-medium text-gray-500"> /month</span>
        </p>
        <p className="text-sm text-gray-500 mb-4">Billed annually</p>

        {/* Features */}
        <ul className="text-left text-gray-700 space-y-2 mb-6">
          <li>✔ Unlimited Trip Planner</li>
          <li>✔ 90 Days Trip History</li>
          <li>✔ 24/7 Email Support</li>
          <li>✔ 3D Place on Map</li>
        </ul>

        {/* Button */}
        <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default Pricing;
