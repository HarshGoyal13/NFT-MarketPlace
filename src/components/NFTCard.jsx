import React from "react";
import { Link } from "react-router-dom";

const NFTCard = ({ nft }) => {

  const timestamp = nft.TimeStamp ? new Date(Number(nft.TimeStamp) * 1000).toLocaleString() : 'Unknown';


  return (
<div className="bg-gray-800 text-white rounded-xl shadow-xl p-2 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative">
  {/* Image Section */}
  <div className="relative overflow-hidden rounded-lg mb-6 shadow-lg hover:shadow-xl">
    <img
      src={nft.image}
      alt={nft.title}
      className="w-full h-56 object-cover rounded-lg transition-transform duration-300 transform hover:scale-110"
    />
    {/* Optional overlay for image */}
    <div className="absolute inset-0 bg-black opacity-30 hover:opacity-0 transition-opacity duration-300"></div>
  </div>

  {/* NFT Details */}
  <div className="flex flex-col gap-4 mb-6">
    <h2 className="text-2xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
      {nft.title}
    </h2>
    <div className="text-lg text-gray-400 font-extrabold space-y-2">
      <p>Price: <span className=" font-extrabold text-green-400">{nft.price} ETH💰</span></p>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="mt-6 flex justify-center items-center">
    <Link
      to={`/nft-details/${nft.Id.toString()}`} // Ensure ID is a string for the URL
      className="bg-red-600 text-white w-full flex justify-center font-bold px-6 py-3 rounded-lg hover:bg-red-800 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
    >
      View Details
    </Link>
  </div>
</div>

  );
};

export default NFTCard;
