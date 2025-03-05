import React from "react";

const RightColumn: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-[#202327] text-gray-100 placeholder-gray-400 rounded-full py-2 pl-10 pr-4 focus:outline-none"
        />
        {/* <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" /> */}
      </div>

      {/* Subscribe to Premium Card */}
      <div className="bg-[#16181C] rounded-xl p-4 text-white space-y-2">
        <h2 className="text-xl font-bold">Subscribe to Premium</h2>
        <p className="text-sm text-gray-400">
          Subscribe to unlock new features and if eligible, receive a share of revenue.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-semibold">
          Subscribe
        </button>
      </div>

      {/* What's Happening Section */}
      <div className="bg-[#16181C] rounded-xl p-4 text-white space-y-4">
        <h2 className="text-xl font-bold">What's happening</h2>
        
        {/* Example Live Event */}
        <div className="border-b border-gray-700 pb-2">
          <h3 className="text-sm font-semibold">Khloé in Wonder Land</h3>
          <p className="text-xs text-red-500 font-bold">LIVE</p>
        </div>
        
        {/* Trending Items */}
        <div className="space-y-2">
          <div className="border-b border-gray-700  pb-2">
            <p className="text-sm text-gray-400">Sports · Trending</p>
            <h3 className="text-sm font-semibold">CONGRESS KA BAAP ROHIT</h3>
            <p className="text-sm text-gray-400">93.7K posts</p>
          </div>
          <div className="border-b border-gray-700 pb-2">
            <p className="text-sm text-gray-400">Sports · Trending</p>
            <h3 className="text-sm font-semibold">#INDvsAUS</h3>
            <p className="text-sm text-gray-400">17.8K posts</p>
          </div>
          <div className="border-b border-gray-700 pb-2">
            <p className="text-sm text-gray-400">Sports · Trending</p>
            <h3 className="text-sm font-semibold">Mannheim</h3>
            <p className="text-sm text-gray-400">166K posts</p>
          </div>
        </div>
        
        <button className="text-blue-400 text-sm hover:underline">Show more</button>
      </div>
    </div>
  );
};

export default RightColumn;
