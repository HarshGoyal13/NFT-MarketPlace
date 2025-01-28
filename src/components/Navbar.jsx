import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { selectedAccount, handelWallet } = useContext(Web3Context);
  const navigate = useNavigate();

  const handleClick = () => {
    if (selectedAccount) {
      navigate("/mint-nft");
    } else {
      handelWallet(); 
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Title */}
        <div className="text-2xl font-bold">
          <Link to="/">
            <span className="text-red-700">NFT</span> Minter
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {selectedAccount && (
            <>
              <Link
                to="/all-nfts"
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                All NFTs
              </Link>

              <Link
                to="/my-nfts"
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                My NFTs
              </Link>

              <Link
                to="/transactions"
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                Transactions
              </Link>
            </>
          )}
        </div>

  
        <div>
          <button
            className="text-white text-lg bg-purple-500 font-bold px-6 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300"
            onClick={handleClick}
          >
            {selectedAccount ? "Mint NFT" : "Connect Wallet"}
          </button>
        </div>

    
      </div>


    </nav>
  );
};

export default Navbar;
