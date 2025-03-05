import React from "react";
import TwitterLayout from "../component/TwitterLayout";

const PremiumPage: React.FC = () => {
  return (
    <TwitterLayout>
      <div className="min-h-screen bg-black py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10">Choose Your Premium Plan</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Plan Card */}
            <div className="bg-blue-950 bg-opacity-40 rounded-lg shadow-lg p-6 flex flex-col transform transition duration-300 hover:scale-105">
              <h2 className="text-2xl font-semibold mb-4">Basic</h2>
              <p className="mb-6 text-white flex-1">
                Ideal for personal use with all the essential features.
              </p>
              <div className="text-3xl lg:text-2xl font-bold mb-4 text-center">$9.99/month</div>
              <button className="w-full bg-blue-950 hover:bg-blue-600 text-white py-2 px-4 rounded transition ease-in-out duration-200">
                Subscribe
              </button>
            </div>
            {/* Medium Plan Card */}
            <div className="bg-blue-950 bg-opacity-40 rounded-lg shadow-lg p-6 flex flex-col transform transition duration-300 hover:scale-105">
              <h2 className="text-2xl font-semibold mb-4">Medium</h2>
              <p className="mb-6 text-white flex-1">
                Perfect for small teams with additional features and support.
              </p>
              <div className="text-3xl lg:text-2xl font-bold mb-4 text-center">$19.99/month</div>
              <button className="w-full bg-blue-950 hover:bg-blue-600 text-white py-2 px-4 rounded transition ease-in-out duration-200">
                Subscribe
              </button>
            </div>
            {/* Advanced Plan Card */}
            <div className="bg-blue-950 bg-opacity-40 rounded-lg shadow-lg p-6 flex flex-col transform transition duration-300 hover:scale-105">
              <h2 className="text-2xl font-semibold mb-4">Advanced</h2>
              <p className="mb-6 text-white flex-1">
                Best for enterprises requiring a full suite of premium features.
              </p>
              <div className="text-3xl lg:text-2xl font-bold mb-4 text-center">$29.99/month</div>
              <button className="w-full bg-blue-950 hover:bg-blue-600 text-white py-2 px-4 rounded transition ease-in-out duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </TwitterLayout>
  );
};

export default PremiumPage;
