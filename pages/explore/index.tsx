import React, { useState } from "react";
import TwitterLayout from "../component/TwitterLayout";

const ExtendedStaticPage: React.FC = () => {
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Sample trending data
  const trendingTopics = [
    {
      category: "Sports · Trending",
      title: "CONGRESS KA BAAP ROHIT",
      postsCount: "93.7K posts",
    },
    {
      category: "Sports · Trending",
      title: "#INDvsAUS",
      postsCount: "17.8K posts",
    },
    {
      category: "Sports · Trending",
      title: "Mannheim",
      postsCount: "166K posts",
    },
    {
      category: "Entertainment · Trending",
      title: "Khloé in Wonder Land",
      postsCount: "LIVE",
    },
    {
      category: "Politics · Trending",
      title: "Elections 2025",
      postsCount: "58K posts",
    },
  ];

  // Filter trending topics based on the search term
  const filteredTopics = trendingTopics.filter((topic) =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TwitterLayout>   
     <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col items-center">
      {/* Search Bar */}
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Subscribe to Premium Section */}
      <div className="w-full max-w-md bg-gray-900 bg-opacity-45 p-4 rounded-xl mb-6">
        <h2 className="text-xl font-bold mb-2">Subscribe to Premium</h2>
        <p className="text-sm text-gray-400 mb-4">
          Subscribe to unlock new features and if eligible, receive a share of
          revenue.
        </p>
        {/* Static "Subscribe" display - no button or interaction */}
        <div className="text-center cursor-pointer bg-blue-700 font-bold text-white py-2 px-4 rounded-full inline-block ">
          Subscribe
        </div>
      </div>

      {/* What's Happening / Trending Section */}
      <div className="w-full max-w-md bg-gray-900  bg-opacity-45  p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-4">What's happening</h2>

        {/* Display filtered trending topics */}
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, index) => (
            <div key={index} className="mb-3">
              <div className="text-sm text-gray-500">{topic.category}</div>
              <div className="text-md font-semibold">{topic.title}</div>
              <div className="text-sm text-gray-500">{topic.postsCount}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-400">No matching trends found.</div>
        )}

        <div className="text-blue-500 cursor-default mt-4">Show more</div>
      </div>
    </div>
    </TwitterLayout>
  );
};

export default ExtendedStaticPage;
